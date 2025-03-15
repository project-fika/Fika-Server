import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ISptWebSocketMessageHandler } from "@spt/servers/ws/message/ISptWebSocketMessageHandler";
import { RawData } from "ws";
import { SPTWebSocket } from "../SPTWebsocket";
export declare class DefaultSptWebSocketMessageHandler implements ISptWebSocketMessageHandler {
    protected logger: ILogger;
    constructor(logger: ILogger);
    onSptMessage(sessionId: string, client: SPTWebSocket, message: RawData): Promise<void>;
}
