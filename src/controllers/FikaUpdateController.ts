import { inject, injectable } from "tsyringe";

import { IFikaUpdateRaidAddPlayerData } from "../models/fika/routes/raid/join/IFikaRaidAddPlayerData";
import { IFikaUpdatePingRequestData } from "../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSetStatusRequestData } from "../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { IFikaUpdateSethostRequestData } from "../models/fika/routes/update/IFikaUpdateSethostRequestData";
import { FikaMatchService } from "../services/FikaMatchService";

@injectable()
export class FikaUpdateController {
    constructor(@inject("FikaMatchService") protected fikaMatchService: FikaMatchService) {
        // empty
    }

    /**
     * Handle /fika/update/ping
     * @param request
     */
    public handlePing(request: IFikaUpdatePingRequestData): void {
        this.fikaMatchService.resetTimeout(request.serverId);
    }

    /**
     * Handle /fika/update/playerspawn
     * @param request
     */
    public handlePlayerspawn(request: IFikaUpdatePlayerspawnRequestData): void {
        this.fikaMatchService.setPlayerGroup(request.serverId, request.profileId, request.groupId);
    }

    /**
     * Handle /fika/update/sethost
     * @param request
     */
    public handleSethost(request: IFikaUpdateSethostRequestData): void {
        this.fikaMatchService.setMatchHost(request.serverId, request.ips, request.port, request.natPunch, request.isDedicated);
    }

    /**
     * Handle /fika/update/setstatus
     * @param request
     */
    public handleSetStatus(request: IFikaUpdateSetStatusRequestData): void {
        this.fikaMatchService.setMatchStatus(request.serverId, request.status);
    }

    /**
     * Handle /fika/update/addplayer
     * @param request
     * @returns
     */
    public handleRaidAddPlayer(request: IFikaUpdateRaidAddPlayerData): void {
        this.fikaMatchService.addPlayerToMatch(request.serverId, request.profileId, { groupId: null, isDead: false, isSpectator: request.isSpectator });
    }

    /**
     * Handle /fika/update/playerdied
     * @param request
     * @returns
     */
    public handleRaidPlayerDied(request: IFikaUpdateRaidAddPlayerData): void {
        this.fikaMatchService.setPlayerDead(request.serverId, request.profileId);
    }
}
