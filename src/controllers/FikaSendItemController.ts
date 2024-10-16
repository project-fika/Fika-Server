import { inject, injectable } from "tsyringe";

import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { MailSendService } from "@spt/services/MailSendService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { EFikaNotifications } from "../models/enums/EFikaNotifications";
import { IFikaSendItemRequestData } from "../models/fika/routes/senditem/IFikaSendItemRequestData";
import { IFikaSenditemAvailablereceiversResponse } from "../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversResponse";
import { IReceivedSentItemNotification } from "../models/fika/websocket/notifications/IReceivedSentItemNotification";
import { FikaConfig } from "../utils/FikaConfig";
import { FikaNotificationWebSocket } from "../websockets/FikaNotificationWebSocket";

@injectable()
export class FikaSendItemController {
    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("EventOutputHolder") protected eventOutputHolder: EventOutputHolder,
        @inject("DatabaseService") protected databaseService: DatabaseService,
        @inject("MailSendService") protected mailSendService: MailSendService,
        @inject("InventoryHelper") protected inventoryHelper: InventoryHelper,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("ItemHelper") protected itemHelper: ItemHelper,
        @inject("HttpResponseUtil") protected httpResponse: HttpResponseUtil,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaNotificationWebSocket") protected fikaNotificationWebSocket: FikaNotificationWebSocket,
    ) {
        // empty
    }

    public sendItem(_pmcData: IPmcData, body: IFikaSendItemRequestData, sessionID: string): IItemEventRouterResponse {
        const fikaConfig = this.fikaConfig.getConfig();
        const output = this.eventOutputHolder.getOutput(sessionID);

        if (!body || !body.id || !body.target) {
            return this.httpResponse.appendErrorToOutput(output, "Missing data in body");
        }

        const senderProfile: ISptProfile = this.saveServer.getProfile(sessionID);
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

        const targetProfile: ISptProfile = this.saveServer.getProfile(body.target);
        if (!targetProfile) {
            return this.httpResponse.appendErrorToOutput(output, "Target profile not found");
        }

        this.logger.info(`${body.id} is going to sessionID: ${body.target}`);

        const senderItems: IItem[] = senderProfile.characters.pmc.Inventory.items;
        const itemsToSend: IItem[] = this.itemHelper.findAndReturnChildrenAsItems(senderItems, body.id);
        if (!itemsToSend || itemsToSend.length === 0) {
            return this.httpResponse.appendErrorToOutput(output, "Item not found in inventory");
        }

        if (fikaConfig.server.giftedItemsLoseFIR) {
            for (const item of itemsToSend) {
                item.upd ??= {};

                item.upd.SpawnedInSession = false;
            }
        }

        this.mailSendService.sendSystemMessageToPlayer(
            body.target,
            `You have received a gift from ${senderProfile?.characters?.pmc?.Info?.Nickname ?? "unknown"}`,
            itemsToSend,
            604800
        );

        this.inventoryHelper.removeItem(senderProfile.characters.pmc, body.id, sessionID, output);

        const notification: IReceivedSentItemNotification = {
            type: EFikaNotifications.SentItem,
            nickname: senderProfile?.characters?.pmc?.Info?.Nickname,
            targetId: body.target,
            itemName: `${itemsToSend[0]._tpl} ShortName`,
        };

        this.fikaNotificationWebSocket.send(body.target, notification);

        return output;
    }

    /**
     * Get available receivers for sending an item
     * @param sessionID
     * @returns
     */
    public handleAvailableReceivers(sessionID: string): IFikaSenditemAvailablereceiversResponse {
        const sender: ISptProfile = this.saveServer.getProfile(sessionID);
        if (!sender) {
            return;
        }

        const result: Record<string, string> = {};
        const profiles = this.saveServer.getProfiles();

        for (const profile of Object.values(profiles)) {
            //Uninitialized profiles can cause this to error out, skip these.
            if (!profile.characters?.pmc?.Info) continue;

            if (profile.info.password === "fika-dedicated") continue;

            const nickname = profile.characters.pmc.Info.Nickname;
            if (!(nickname in result) && nickname !== sender.characters.pmc.Info.Nickname) {
                result[nickname] = profile.info.id;
            }
        }

        return result;
    }
}
