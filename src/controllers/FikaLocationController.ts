import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { FikaHeadlessHelper } from "../helpers/FikaHeadlessHelper";
import { IFikaRaidsResponse } from "../models/fika/routes/location/IFikaRaidsResponse";
import { FikaMatchService } from "../services/FikaMatchService";

@injectable()
export class FikaLocationController {
    constructor(
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("FikaHeadlessHelper") protected fikaHeadlessHelper: FikaHeadlessHelper,
    ) {
        // empty
    }

    /**
     * Handle /fika/location/raids
     * @param request
     * @returns
     */
    public handleGetRaids(_request: IGetRaidConfigurationRequestData): IFikaRaidsResponse {
        const matches: IFikaRaidsResponse = [];

        for (const [matchId, match] of this.fikaMatchService.getAllMatches()) {
            const players: Record<string, boolean> = {};
            for (const [profileId, player] of match.players) {
                players[profileId] = player.isDead;
            }

            let hostUsername = match.hostUsername;

            if (match.isHeadless) {
                hostUsername = this.fikaHeadlessHelper.getHeadlessNickname(matchId);
            }

            matches.push({
                serverId: matchId,
                hostUsername: hostUsername,
                playerCount: match.players.size,
                status: match.status,
                location: match.raidConfig.location,
                side: match.side,
                time: match.time,
                players: players,
                isHeadless: match.isHeadless,
                headlessRequesterNickname: this.fikaHeadlessHelper.getRequesterUsername(matchId) || "", //Set this to an empty string if there is no requester.
            });
        }

        return matches;
    }
}
