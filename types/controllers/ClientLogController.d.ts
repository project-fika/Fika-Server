import { IClientLogRequest } from "@spt-aki/models/spt/logging/IClientLogRequest";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
export declare class ClientLogController {
    protected logger: ILogger;
    constructor(logger: ILogger);
    /**
     * Handle /singleplayer/log
     */
    clientLog(logRequest: IClientLogRequest): void;
}
