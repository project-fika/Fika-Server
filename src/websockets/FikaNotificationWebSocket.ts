import { IncomingMessage } from "http";
import { inject, injectable } from "tsyringe";
import { WebSocket } from "ws";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";

import { EFikaNotifications } from "../models/enums/EFikaNotifications";
import { IFikaNotificationBase } from "../models/fika/websocket/IFikaNotificationBase";
import { FikaPresenceService } from "../services/FikaPresenceService";

@injectable()
export class FikaNotificationWebSocket implements IWebSocketConnectionHandler {
    private clientWebSockets: Record<string, WebSocket>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("FikaPresenceService") protected fikaPresenceService: FikaPresenceService,
    ) {
        this.clientWebSockets = {};

        // Keep websocket connections alive
        setInterval(() => {
            this.keepWebSocketAlive();
        }, 30000);
    }

    public getSocketId(): string {
        return "Fika Notification Manager";
    }

    public getHookUrl(): string {
        return "/fika/notification/";
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

        this.fikaPresenceService.addPlayerPresence(UserSessionID);
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

        this.fikaPresenceService.removePlayerPresence(sessionID);
    }

    // Send functionality for sending to a single client.
    public send(sessionID: string, message: IFikaNotificationBase): void {
        const client = this.clientWebSockets[sessionID];

        // Client is not online or not currently connected to the websocket.
        if (!client) {
            return;
        }

        // Client was formerly connected to the websocket, but may have connection issues as it didn't run onClose
        if (client.readyState === WebSocket.CLOSED) {
            return;
        }

        client.send(JSON.stringify(message));
    }

    public broadcast(message: IFikaNotificationBase): void {
        for (const sessionID in this.clientWebSockets) {
            this.send(sessionID, message);
        }
    }

    private keepWebSocketAlive(): void {
        for (const sessionID in this.clientWebSockets) {
            let message: IFikaNotificationBase = {
                type: EFikaNotifications.KeepAlive,
            };

            this.send(sessionID, message);
        }
    }
}
