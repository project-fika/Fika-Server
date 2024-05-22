import { RawData, WebSocket } from "ws";
export interface ISptWebSocketMessageHandler {
    onSptMessage(sessionID: string, client: WebSocket, message: RawData): void;
}
