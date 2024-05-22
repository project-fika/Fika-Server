/// <reference types="node" />
import { IncomingMessage } from "node:http";
import { WebSocket } from "ws";
export interface IWebSocketConnectionHandler {
    getSocketId(): string;
    getHookUrl(): string;
    onConnection(ws: WebSocket, req: IncomingMessage): void;
}
