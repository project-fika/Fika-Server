import { inject, injectable } from "tsyringe";

import { IFikaConfigClient } from "../models/fika/config/IFikaConfigClient";

import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";

import { FikaClientModHashesHelper } from "../helpers/FikaClientModHashesHelper";
import { IFikaConfigHeadless } from "../models/fika/config/IFikaConfigHeadless";
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

    constructor(@inject("FikaClientService") protected fikaClientService: FikaClientService) {}
    /**
     * Handle /fika/client/config
     */
    public handleClientConfig(): IFikaConfigClient {
        const clientConfig = this.fikaClientService.getClientConfig();

        //Here be dragons, this is technically not in the client config, or well it was.. But it was decided it was better for this configuration
        //To be together with 'sentItemsLoseFIR' so users could find both options easier.
        //Keep this here as this is really only supposed to be a 'client' config and it's really only used on the client.
        (clientConfig as any).allowItemSending = this.fikaClientService.getIsItemSendingAllowed();

        return clientConfig;
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
    public handleCheckMods(request: IFikaCheckModRequestData, sessionID: string): IFikaCheckModResponse {
        return this.fikaClientService.getCheckModsResponse(request, sessionID);
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
