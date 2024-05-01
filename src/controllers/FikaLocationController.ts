import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";

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
            matches.push({
                serverId: matchId,
                hostUsername: match.hostUsername,
                playerCount: match.players.size,
                status: match.status,
                location: match.raidConfig.location,
                side: match.side,
                time: match.time,
            });
        }

        return matches;
    }
}
