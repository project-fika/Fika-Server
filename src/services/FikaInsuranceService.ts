import { inject, injectable } from "tsyringe";
import { ILogger } from "@spt/models/spt/utils/ILogger";

import { MatchController } from "@spt/controllers/MatchController";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { SaveServer } from "@spt/servers/SaveServer";

import { IFikaInsurancePlayer } from "../models/fika/insurance/IFikaInsurancePlayer";

@injectable()
export class FikaInsuranceService {
    private matchInsuranceInfo: Record<string, IFikaInsurancePlayer[]>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("ItemHelper") protected itemHelper: ItemHelper,
        @inject("MatchController") protected matchController: MatchController,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.matchInsuranceInfo = {};
    }

    public getMatchId(sessionID: string): string {
        for (const matchId in this.matchInsuranceInfo) {
            const match = this.matchInsuranceInfo[matchId];

            if (match.find((player) => player.sessionID == sessionID)) {
                return matchId;
            }
        }
    }

    public addPlayerToMatchId(matchId: string, sessionID: string): void {
        if (!(matchId in this.matchInsuranceInfo)) {
            this.matchInsuranceInfo[matchId] = [];
        }

        let player: IFikaInsurancePlayer = {
            sessionID: sessionID,
            endedRaid: false,
            lostItems: [],
            foundItems: [],
            inventory: [],  
        };

        this.matchInsuranceInfo[matchId].push(player);
    }

    public onEndLocalRaidRequest(sessionID: string, matchId: string, endLocalRaidRequest: IEndLocalRaidRequestData): void {
        if (!(matchId in this.matchInsuranceInfo)) {
            this.logger.error("[Fika Insurance] onEndLocalRaidRequest: matchId not found!");

            // Pass back to SPT so that the player can save.
            MatchController.prototype.endLocalRaid.call(this.matchController, sessionID, endLocalRaidRequest);
            return;
        }

        const match = this.matchInsuranceInfo[matchId];

        for (const player of match) {
            if (player.sessionID != sessionID) {
                continue;
            }

            // Map both the lost items and the current inventory
            player.lostItems = endLocalRaidRequest.lostInsuredItems.map((i) => i._id);
            player.inventory = endLocalRaidRequest.results.profile.Inventory.items.map((i) => i._id);
            player.endedRaid = true;
        }

        // Pass back to SPT so that the player can save.
        MatchController.prototype.endLocalRaid.call(this.matchController, sessionID, endLocalRaidRequest);
    }

    public onMatchEnd(matchId: string): void {
        if (!(matchId in this.matchInsuranceInfo)) {
            return;
        }

        const match = this.matchInsuranceInfo[matchId];

        match.forEach((player) => {
            // This player either crashed or the raid ended prematurely, eitherway we skip him.
            if (!player.endedRaid) {
                return;
            }

            match.forEach((nextPlayer) => {
                // Don't need to check the player we have in the base loop
                if (player.sessionID == nextPlayer.sessionID) {
                    return;
                }

                // This player either crashed or the raid ended prematurely, eitherway we skip him.
                if (!nextPlayer.endedRaid) {
                    return;
                }

                // Find overlap between players other than the initial player we're looping over, if it contains the lost item id of the initial player we add it to foundItems
                const overlap = nextPlayer.inventory.filter((i) => player.lostItems.includes(i));

                // Add said overlap to player's found items
                player.foundItems = player.foundItems.concat(overlap);
            });

            if (player.foundItems.length > 0) {
                this.logger.debug(`${player.sessionID} will lose ${player.foundItems.length}/${player.lostItems.length} items in insurance`);
                this.removeItemsFromInsurance(player.sessionID, player.foundItems);
            }
        });

        delete this.matchInsuranceInfo[matchId];
    }

    private removeItemsFromInsurance(sessionID: string, ids: string[]): void {
        const profile = this.saveServer.getProfile(sessionID);

        for (let insuranceIndex = 0; insuranceIndex < profile.insurance.length; insuranceIndex++) {
            let insurance = profile.insurance[insuranceIndex];

            for (const idToRemove of ids) {
                const insuredItemIndex = insurance.items.findIndex((i) => i._id == idToRemove);

                if (insuredItemIndex != -1) {
                    const item = insurance.items[insuredItemIndex];
                    this.logger.debug(`[Fika Insurance] Found ${item._id} which will be removed`);

                    // Remove soft inserts out of armors
                    if (this.itemHelper.isOfBaseclass(item._tpl, BaseClasses.ARMOR) || this.itemHelper.isOfBaseclass(item._tpl, BaseClasses.HEADWEAR)) {
                        this.logger.debug(`[Fika Insurance] ${item._id} is an armor or helmet`);

                        // Copy the original array, when we splice into the original array while looping over it we will skip certain items.
                        let insuranceItems = Array.from(insurance.items);

                        insuranceItems.forEach((innerItem) => {
                            this.logger.debug(`[Fika Insurance] Inner item: ${innerItem._id}`);

                            if (innerItem.parentId == item._id && this.itemHelper.isOfBaseclass(innerItem._tpl, BaseClasses.BUILT_IN_INSERTS)) {
                                // There's mods that allow you to take soft inserts out and those will most likely have insurance set, dont need to remove those here.
                                if (!ids.includes(innerItem._id)) {
                                    this.logger.debug(`[Fika Insurance] Removing soft insert ${innerItem._id} of item ${item._id}`);

                                    const innerItemIndex = insurance.items.findIndex((i) => i._id == innerItem._id);

                                    insurance.items.splice(innerItemIndex, 1);
                                }
                            }
                        });
                    }

                    // Remove the original item
                    insurance.items.splice(insuredItemIndex, 1);
                }
            }

            if (insurance.items.length == 0) {
                this.logger.debug("No more insured items left, deleting this entry");
                profile.insurance.splice(insuranceIndex, 1);
                insuranceIndex--;
            } else {
                // Update existing insured item list
                profile.insurance[insuranceIndex] = insurance;
            }
        }
    }
}
