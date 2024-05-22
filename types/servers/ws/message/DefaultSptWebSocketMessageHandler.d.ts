import { RawData, WebSocket } from "ws";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ISptWebSocketMessageHandler } from "@spt/servers/ws/message/ISptWebSocketMessageHandler";
export declare class DefaultSptWebSocketMessageHandler implements ISptWebSocketMessageHandler {
    protected logger: ILogger;
    constructor(logger: ILogger);
    onSptMessage(sessionId: string, client: WebSocket, message: RawData): void;
}
