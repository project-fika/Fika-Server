import { ClientLogController } from "@spt/controllers/ClientLogController";
import { ModLoadOrder } from "@spt/loaders/ModLoadOrder";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
/** Handle client logging related events */
export declare class ClientLogCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected clientLogController: ClientLogController;
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected modLoadOrder: ModLoadOrder;
    constructor(httpResponse: HttpResponseUtil, clientLogController: ClientLogController, configServer: ConfigServer, localisationService: LocalisationService, modLoadOrder: ModLoadOrder);
    /**
     * Handle /singleplayer/log
     */
    clientLog(url: string, info: IClientLogRequest, sessionID: string): INullResponseData;
    /**
     * Handle /singleplayer/release
     */
    releaseNotes(): string;
    /**
     * Handle /singleplayer/enableBSGlogging
     */
    bsgLogging(): string;
}
