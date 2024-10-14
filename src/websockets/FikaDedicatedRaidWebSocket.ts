import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";

@injectable()
export class FikaDedicatedRaidWebSocket implements IWebSocketConnectionHandler {
    public clientWebSockets: Record<string, WebSocket>;

    constructor(@inject("WinstonLogger") protected logger: ILogger) {
        this.clientWebSockets = {};

        // Keep websocket connections alive
        setInterval(() => {
            this.keepWebSocketAlive();
        }, 30000);
    }

    public getSocketId(): string {
        return "Fika Dedicated Raid Service";
    }

    public getHookUrl(): string {
        return "/fika/dedicatedraidservice/";
    }

    public onConnection(ws: WebSocket, req: IncomingMessage): void {
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();

        this.clientWebSockets[sessionID] = ws;

        ws.on("message", (msg) => this.onMessage(sessionID, msg.toString()));
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onMessage(sessionID: string, msg: string): void {
        // Do nothing
    }

    public keepWebSocketAlive(): void {
        for (const sessionId in this.clientWebSockets) {
            const clientWebSocket = this.clientWebSockets[sessionId];

            if (clientWebSocket.readyState == WebSocket.CLOSED) {
                delete this.clientWebSockets[sessionId];
                return;
            }

            // Send a keep alive message to the dedicated client
            clientWebSocket.send(
                JSON.stringify({
                    type: "fikaDedicatedKeepAlive",
                }),
            );
        }
    }
}
