import { inject, injectable } from "tsyringe";

import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IFikaSendItemRequestData } from "../models/fika/routes/senditem/IFikaSendItemRequestData";
import { IFikaSenditemAvailablereceiversResponse } from "../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversResponse";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaSendItemController {
    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("EventOutputHolder") protected eventOutputHolder: EventOutputHolder,
        @inject("MailSendService") protected mailSendService: MailSendService,
        @inject("InventoryHelper") protected inventoryHelper: InventoryHelper,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("ItemHelper") protected itemHelper: ItemHelper,
        @inject("HttpResponseUtil") protected httpResponse: HttpResponseUtil,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        // empty
    }

    public sendItem(_pmcData: IPmcData, body: IFikaSendItemRequestData, sessionID: string): IItemEventRouterResponse {
        const fikaConfig = this.fikaConfig.getConfig();
        const output = this.eventOutputHolder.getOutput(sessionID);

        if (!body || !body.id || !body.target) {
            return this.httpResponse.appendErrorToOutput(output, "Missing data in body");
        }

        const senderProfile: IAkiProfile = this.saveServer.getProfile(sessionID);
        if (!senderProfile) {
            return this.httpResponse.appendErrorToOutput(output, "Sender profile not found");
        }

        // Disabled until functionality is required due to being buggy

        // if (senderProfile.inraid.location != "none") {
        //     return this.httpResponse.appendErrorToOutput(
        //         output,
        //         `You cannot send items while in raid, current state is: ${senderProfile.inraid.location}`
        //     );
        // }

        const targetProfile: IAkiProfile = this.saveServer.getProfile(body.target);
        if (!targetProfile) {
            return this.httpResponse.appendErrorToOutput(output, "Target profile not found");
        }

        this.logger.info(`${body.id} is going to sessionID: ${body.target}`);

        const senderItems: Item[] = senderProfile.characters.pmc.Inventory.items;
        const itemsToSend: Item[] = this.itemHelper.findAndReturnChildrenAsItems(senderItems, body.id);
        if (!itemsToSend || itemsToSend.length === 0) {
            return this.httpResponse.appendErrorToOutput(output, "Item not found in inventory");
        }

        if (fikaConfig.server.giftedItemsLoseFIR) {
            for (const item of itemsToSend) {
                item.upd ??= {};

                item.upd.SpawnedInSession = false;
            }
        }

        this.mailSendService.sendUserMessageToPlayer(
            body.target,
            {
                _id: senderProfile.info.id,
                aid: senderProfile.info.aid,
                Info: {
                    Nickname: senderProfile.info.username,
                    Side: senderProfile.characters.pmc.Info.Side,
                    Level: senderProfile.characters.pmc.Info.Level,
                    MemberCategory: senderProfile.characters.pmc.Info.MemberCategory,
                },
            },
            `You have received a gift from ${senderProfile.info.username}`,
            itemsToSend,
        );

        this.inventoryHelper.removeItem(senderProfile.characters.pmc, body.id, sessionID, output);

        return output;
    }

    /**
     * Get available receivers for sending an item
     * @param sessionID
     * @returns
     */
    public handleAvailableReceivers(sessionID: string): IFikaSenditemAvailablereceiversResponse {
        const sender: IAkiProfile = this.saveServer.getProfile(sessionID);
        if (!sender) {
            return;
        }

        const result: Record<string, string> = {};
        const profiles = this.saveServer.getProfiles();

        for (const profile of Object.values(profiles)) {
            const username = profile.info.username;
            if (!(username in result) && username !== sender.info.username) {
                result[username] = profile.info.id;
            }
        }

        return result;
    }
}
