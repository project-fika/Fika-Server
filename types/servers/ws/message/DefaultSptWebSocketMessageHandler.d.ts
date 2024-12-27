import type { ILogger } from "@spt/models/spt/utils/ILogger";
import type { ISptWebSocketMessageHandler } from "@spt/servers/ws/message/ISptWebSocketMessageHandler";
import { WebSocket } from "ws";
import type { RawData } from "ws";
export declare class DefaultSptWebSocketMessageHandler implements ISptWebSocketMessageHandler {
    protected logger: ILogger;
    constructor(logger: ILogger);
    onSptMessage(sessionId: string, client: WebSocket, message: RawData): void;
}
