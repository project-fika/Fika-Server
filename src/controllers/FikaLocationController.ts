import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { IFikaRaidsResponse } from "../models/fika/routes/location/IFikaRaidsResponse";
import { FikaMatchService } from "../services/FikaMatchService";

@injectable()
export class FikaLocationController {
    constructor(@inject("FikaMatchService") protected fikaMatchService: FikaMatchService) {
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

            matches.push({
                serverId: matchId,
                hostUsername: match.hostUsername,
                playerCount: match.players.size,
                status: match.status,
                location: match.raidConfig.location,
                side: match.side,
                time: match.time,
                players: players,
            });
        }

        return matches;
    }
}
