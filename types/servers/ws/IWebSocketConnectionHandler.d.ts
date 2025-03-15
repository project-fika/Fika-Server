import { IncomingMessage } from "node:http";
import { SPTWebSocket } from "./SPTWebsocket";
export interface IWebSocketConnectionHandler {
    getSocketId(): string;
    getHookUrl(): string;
    onConnection(ws: SPTWebSocket, req: IncomingMessage): Promise<void>;
}
