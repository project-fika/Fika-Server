import { inject, injectable } from "tsyringe";

import { IFikaConfigClient } from "../models/fika/config/IFikaConfigClient";

import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";

import { FikaClientModHashesHelper } from "../helpers/FikaClientModHashesHelper";
import { IFikaConfigNatPunchServer } from "../models/fika/config/IFikaConfigNatPunchServer";
import { IFikaCheckModRequestData } from "../models/fika/routes/client/check/IFikaCheckModRequestData";
import { IFikaCheckModResponse, IVersionCheckResponse } from "../models/fika/routes/client/check/IFikaCheckModResponse";
import { FikaClientService } from "../services/FikaClientService";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaClientController {
    protected requiredMods: string[] = [];
    protected allowedMods: string[] = [];
    protected hasRequiredOrOptionalMods: boolean = true;

    constructor(
        @inject("FikaClientService") protected fikaClientService: FikaClientService,
        @inject("FikaClientModHashesHelper") protected fikaClientModHashesHelper: FikaClientModHashesHelper,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {}
    /**
     * Handle /fika/client/config
     */
    public handleClientConfig(): IFikaConfigClient {
        return this.fikaClientService.getClientConfig();
    }

    /**
     * Handle /fika/natpunchserver/config
     */
    public handleNatPunchServerConfig(): IFikaConfigNatPunchServer {
        return this.fikaClientService.getNatPunchServerConfig();
    }

    /**
     * Handle /fika/client/check/mods
     */
    public handleCheckMods(request: IFikaCheckModRequestData): IFikaCheckModResponse {
        return this.fikaClientService.getCheckModsResponse(request);
    }

    /**
     * Handle /fika/profile/download
     */
    public handleProfileDownload(sessionID: string): any {
        return this.fikaClientService.getProfileBySessionID(sessionID);
    }

    /**
     * Handle /fika/client/check/version
     */
    public handleVersionCheck(): IVersionCheckResponse {
        return this.fikaClientService.getVersion();
    }
}
