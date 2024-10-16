import { inject, injectable } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";

@injectable()
export class FikaDedicatedRaidWebSocket implements IWebSocketConnectionHandler {
    public clientWebSockets: Record<string, WebSocket>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
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
        if (req.headers.authorization === undefined) {
            ws.close();
            return;
        }

        const Authorization = Buffer.from(req.headers.authorization.split(" ")[1], "base64").toString().split(":");
        const UserSessionID = Authorization[0];

        this.logger.debug(`[${this.getSocketId()}] User is ${UserSessionID}`);

        if (!this.saveServer.getProfile(UserSessionID)) {
            this.logger.warning(`[${this.getSocketId()}] Invalid user ${UserSessionID} tried to authenticate!`);
            return;
        }

        this.clientWebSockets[UserSessionID] = ws;

        ws.on("message", (msg) => this.onMessage(UserSessionID, msg.toString()));
        ws.on("close", (code, reason) => this.onClose(ws, UserSessionID, code, reason));
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onMessage(sessionID: string, msg: string): void {
        // Do nothing
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onClose(ws: WebSocket, sessionID: string, code: number, reason: Buffer): void {
        const clientWebSocket = this.clientWebSockets[sessionID];

        if (clientWebSocket === ws) {
            this.logger.debug(`[${this.getSocketId()}] Deleting client ${sessionID}`);

            delete this.clientWebSockets[sessionID];
        }
    }

    private keepWebSocketAlive(): void {
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
