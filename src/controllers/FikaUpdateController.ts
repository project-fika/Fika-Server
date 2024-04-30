import { inject, injectable } from "tsyringe";

import { IFikaUpdatePingRequestData } from "../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSetStatusRequestData } from "../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { IFikaUpdateSethostRequestData } from "../models/fika/routes/update/IFikaUpdateSethostRequestData";
import { IFikaUpdateSpawnpointRequestData } from "../models/fika/routes/update/IFikaUpdateSpawnpointRequestData";
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
     * Handle /fika/update/spawnpoint
     * @param request
     */
    public handleSpawnpoint(request: IFikaUpdateSpawnpointRequestData): void {
        this.fikaMatchService.setMatchSpawnPoint(request.serverId, request.name);
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
        this.fikaMatchService.setMatchHost(request.serverId, request.ip, request.port);
    }

    /**
     * Handle /fika/update/setstatus
     * @param request
     */
    public handleSetStatus(request: IFikaUpdateSetStatusRequestData): void {
        this.fikaMatchService.setMatchStatus(request.serverId, request.status);
    }
}
