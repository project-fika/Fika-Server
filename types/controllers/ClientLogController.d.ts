import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { ILogger } from "@spt/models/spt/utils/ILogger";
export declare class ClientLogController {
    protected logger: ILogger;
    constructor(logger: ILogger);
    /**
     * Handle /singleplayer/log
     */
    clientLog(logRequest: IClientLogRequest): void;
}
