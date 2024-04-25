import { ClientLogController } from "@spt-aki/controllers/ClientLogController";
import { ModLoadOrder } from "@spt-aki/loaders/ModLoadOrder";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IClientLogRequest } from "@spt-aki/models/spt/logging/IClientLogRequest";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
