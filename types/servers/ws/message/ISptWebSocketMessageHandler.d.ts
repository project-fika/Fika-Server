import { RawData } from "ws";
import { SPTWebSocket } from "../SPTWebsocket";
export interface ISptWebSocketMessageHandler {
    onSptMessage(sessionID: string, client: SPTWebSocket, message: RawData): Promise<void>;
}
