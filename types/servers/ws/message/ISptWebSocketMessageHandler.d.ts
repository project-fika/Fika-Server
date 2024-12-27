import { WebSocket } from "ws";
import type { RawData } from "ws";
export interface ISptWebSocketMessageHandler {
    onSptMessage(sessionID: string, client: WebSocket, message: RawData): void;
}
