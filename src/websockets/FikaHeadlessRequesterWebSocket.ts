import { inject, injectable } from "tsyringe";

import { IncomingMessage } from "http";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { SPTWebSocket } from "@spt/servers/ws/SPTWebsocket";
import { EFikaHeadlessWSMessageTypes } from "../models/enums/EFikaHeadlessWSMessageTypes";
import { IFikaHeadlessBase } from "../models/fika/websocket/IFikaHeadlessBase";

@injectable()
export class FikaHeadlessRequesterWebSocket implements IWebSocketConnectionHandler {
    private requesterWebSockets: Record<string, SPTWebSocket> = {};

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        // Keep websocket connections alive
        setInterval(async () => {
            await this.keepWebSocketAlive();
        }, 30000);
    }

    public getSocketId(): string {
        return "Fika Headless Requester";
    }

    public getHookUrl(): string {
        return "/fika/headless/requester";
    }

    public async onConnection(ws: SPTWebSocket, req: IncomingMessage): Promise<void> {
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

        this.requesterWebSockets[UserSessionID] = ws;
        ws.on("close", (code, reason) => this.onClose(ws, UserSessionID, code, reason));
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onClose(ws: SPTWebSocket, sessionID: string, code: number, reason: Buffer): void {
        const clientWebSocket = this.requesterWebSockets[sessionID];

        if (clientWebSocket === ws) {
            this.logger.debug(`[${this.getSocketId()}] Deleting requester ${sessionID}`);

            delete this.requesterWebSockets[sessionID];
        }
    }

    public async sendAsync(sessionID: string, message: IFikaHeadlessBase): Promise<void> {
        const client = this.requesterWebSockets[sessionID];

        // Client is not online or not currently connected to the websocket.
        if (!client) {
            this.logger.warning(`[${this.getSocketId()}] Requester (${sessionID}) is not connected yet?`);
            return;
        }

        // Client was formerly connected to the websocket, but may have connection issues as it didn't run onClose
        if (client.readyState === WebSocket.CLOSED) {
            this.logger.warning(`[${this.getSocketId()}] Requester (${sessionID})'s websocket is closed?`);
            return;
        }

        await client.sendAsync(JSON.stringify(message));
    }

    private async keepWebSocketAlive(): Promise<void> {
        for (const sessionId in this.requesterWebSockets) {
            const clientWebSocket = this.requesterWebSockets[sessionId];

            if (clientWebSocket.readyState === WebSocket.CLOSED) {
                delete this.requesterWebSockets[sessionId];
                return;
            }

            let message: IFikaHeadlessBase = {
                type: EFikaHeadlessWSMessageTypes.KeepAlive,
            };

            // Send a keep alive message to the headless client
            await clientWebSocket.sendAsync(JSON.stringify(message));
        }
    }
}
