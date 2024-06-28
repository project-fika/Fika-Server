import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";

import { IFikaRaidsResponse } from "../models/fika/routes/location/IFikaRaidsResponse";
import { FikaMatchService } from "../services/FikaMatchService";
import { FikaMatchStatus } from "../models/enums/FikaMatchStatus";

@injectable()
export class FikaLocationController {
    constructor(@inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("WinstonLogger") protected logger: ILogger) {
    }

    /**
     * Handle /fika/location/raids
     * @param _request
     * @param sessionID
     * @returns
     */
    public handleGetRaids(_request: IGetRaidConfigurationRequestData, sessionID: string): IFikaRaidsResponse {
        const matches: IFikaRaidsResponse = [];

        for (const [matchId, match] of this.fikaMatchService.getAllMatches()) {

            let matchStatus: FikaMatchStatus = match.status;

            // sessionID is player searching for a match, make sure its not the host too
            if (match.players.get(sessionID) !== undefined && sessionID !== matchId) {
                this.logger.info(`Player ${sessionID} is in match ${matchId}`);
                this.logger.info(`Setting match.status to Rejoin`);
                matchStatus = FikaMatchStatus.REJOIN;
            }

            matches.push({
                serverId: matchId,
                hostUsername: match.hostUsername,
                playerCount: match.players.size,
                status: matchStatus,
                location: match.raidConfig.location,
                side: match.side,
                time: match.time,
            });
        }

        return matches;
    }
}
