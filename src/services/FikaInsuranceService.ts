import { InraidController } from "@spt/controllers/InraidController";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "@spt/models/eft/inRaid/ISaveProgressRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { InsuranceService } from "@spt/services/InsuranceService";
import { inject, injectable } from "tsyringe";

export interface IInsuranceInformation {
    allInsuranceItemIds: string[];
    itemsPlayersExtractedWith: string[];
}

@injectable()
export class FikaInsuranceService {
    // Items left in here by the time the raid ends will be removed from player insurances
    //                                  matchId        profileId
    private matchInsuranceInfos: Record<string, Record<string, IInsuranceInformation>>;
    private matchIdToPlayers: Record<string, string[]>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("InsuranceService") protected insuranceService: InsuranceService,
        @inject("InraidController") protected inraidController: InraidController,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.matchInsuranceInfos = {};
        this.matchIdToPlayers = {};
    }

    public getMatchId(sessionID: string) {
        this.logger.warning(JSON.stringify(this.matchIdToPlayers));
        for (const matchId in this.matchIdToPlayers) {
            if (this.matchIdToPlayers[matchId].includes(sessionID)) {
                return matchId;
            }
        }
    }

    public addInsuranceInformation(matchId: string, sessionID: string) {
        const profile = this.saveServer.getProfile(sessionID);
        const insuredItemsOnProfile = profile.characters.pmc.InsuredItems.map(i => i.itemId);
        this.logger.info(`${sessionID} has ${insuredItemsOnProfile.length} items on profile`);

        if (!(matchId in this.matchInsuranceInfos)) {
            this.matchInsuranceInfos[matchId] = {};
        }

        this.matchInsuranceInfos[matchId][sessionID] = {
            allInsuranceItemIds: insuredItemsOnProfile,
            itemsPlayersExtractedWith: []
        };

        if (!(matchId in this.matchIdToPlayers)) {
            this.matchIdToPlayers[matchId] = [];
        }

        this.matchIdToPlayers[matchId].push(sessionID);
        this.logger.info(JSON.stringify(this.matchIdToPlayers));
    }

    public onSavePostRaidProgress(sessionID: string, matchId: string, offraidData: ISaveProgressRequestData) {
        if (!(matchId in this.matchInsuranceInfos)) {
            this.logger.error("onSavePostRaidProgress: !(matchId in this.matchInsuranceInfos)");
            return;
        }

        if (!this.matchIdToPlayers[matchId].includes(sessionID)) {
            this.logger.error(`${matchId} does not contain ${sessionID}`);
            return;
        }

        const insuranceInfos: Record<string, IInsuranceInformation> = this.matchInsuranceInfos[matchId];
        const playerItems: Item[] = offraidData.profile.Inventory.items;
        for (const insuranceInformation of Object.values(insuranceInfos)) {
            const overlap = playerItems.filter(i => insuranceInformation.allInsuranceItemIds.includes(i._id)).map(i => i._id);
            insuranceInformation.itemsPlayersExtractedWith = insuranceInformation.itemsPlayersExtractedWith.concat(overlap);
        }

        InraidController.prototype.savePostRaidProgress.call(this.inraidController, offraidData, sessionID);
        this.matchIdToPlayers[matchId] = this.matchIdToPlayers[matchId].filter(id => id != sessionID);
        if (this.matchIdToPlayers[matchId].length == 0) {
            this.logger.info("No more players left in match, removing it");
            this.onMatchEnd(matchId);
        }
        else {
            this.logger.info(`Removed player: ${JSON.stringify(this.matchIdToPlayers)}`);
        }
    }

    public onMatchEnd(matchId: string) {
        if (!(matchId in this.matchInsuranceInfos)) {
            this.logger.error("onMatchEnd: !(matchId in this.matchInsuranceInfos)");
            return;
        }

        const matchInsuranceInfo: Record<string, IInsuranceInformation> = this.matchInsuranceInfos[matchId];
        for (const sessionID in matchInsuranceInfo) {
            const insuranceInformation = matchInsuranceInfo[sessionID];
            this.logger.info(JSON.stringify(insuranceInformation));
            if (insuranceInformation.itemsPlayersExtractedWith.length > 0) {
                this.logger.info(`${sessionID} will lose ${insuranceInformation.itemsPlayersExtractedWith.length}/${insuranceInformation.allInsuranceItemIds.length} items`);
                this.removeItemsFromInsurance(sessionID, insuranceInformation.itemsPlayersExtractedWith);
            }
        }

        delete this.matchIdToPlayers[matchId];
    }

    private removeItemsFromInsurance(sessionID: string, ids: string[]) {
        const insurances = this.insuranceService.getInsurance(sessionID);
        for (const tid in insurances) {
            let insuredItems = insurances[tid];
            for (const idToRemove of ids) {
                const insuredItemIndex = insuredItems.findIndex(i => i._id == idToRemove);
                if (insuredItemIndex != -1) {
                    const itemToRemove = insuredItems[insuredItemIndex];
                    this.logger.info(`Found ${itemToRemove._id} which will be removed`);
                    insuredItems = insuredItems.splice(insuredItemIndex, 1);
                }
                else {
                    this.logger.error(`Could not find ${idToRemove}`);
                }

                if (insuredItems.length == 0) {
                    this.logger.info("No more insured items left, deleting this entry");
                    delete insurances[tid];
                }
                else {
                    insurances[tid] = insuredItems;
                    this.logger.info("Updated existing list of insured items");
                }
            }
        }
    }
}
