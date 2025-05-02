import { inject, injectable } from "tsyringe";

import { IncomingMessage } from "http";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { SPTWebSocket } from "@spt/servers/ws/SPTWebsocket";
import { FikaHeadlessHelper } from "../helpers/FikaHeadlessHelper";
import { EFikaHeadlessWSMessageTypes } from "../models/enums/EFikaHeadlessWSMessageTypes";
import { IFikaHeadlessBase } from "../models/fika/websocket/IFikaHeadlessBase";
import { FikaMatchService } from "../services/FikaMatchService";
import { FikaHeadlessService } from "../services/headless/FikaHeadlessService";

@injectable()
export class FikaHeadlessClientWebSocket implements IWebSocketConnectionHandler {
    private headlessWebSockets: Record<string, SPTWebSocket> = {};

    constructor(
        @inject("FikaHeadlessHelper") protected fikaHeadlessHelper: FikaHeadlessHelper,
        @inject("FikaHeadlessService") protected fikaHeadlessService: FikaHeadlessService,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        // Keep websocket connections alive
        setInterval(async () => {
            await this.keepWebSocketAlive();
        }, 30000);
    }

    public getSocketId(): string {
        return "Fika Headless Client";
    }

    public getHookUrl(): string {
        return "/fika/headless/client";
    }

    public async onConnection(ws: SPTWebSocket, req: IncomingMessage): Promise<void> {
        if (req.headers.authorization === undefined) {
            ws.close();
            return;
        }

        const Authorization = Buffer.from(req.headers.authorization.split(" ")[1], "base64").toString().split(":");
        const UserSessionID = Authorization[0];

        this.logger.debug(`[${this.getSocketId()}] User is ${UserSessionID}`);

        if (!this.fikaHeadlessHelper.isHeadlessClient(UserSessionID)) {
            this.logger.warning(`[${this.getSocketId()}] Invalid headless client ${UserSessionID} tried to authenticate!`);
            return;
        }

        this.headlessWebSockets[UserSessionID] = ws;

        ws.on("message", (msg) => this.onMessage(UserSessionID, msg.toString()));
        ws.on("close", (code, reason) => this.onClose(ws, UserSessionID, code, reason));

        // Cleanup match if headless has crashed before re-adding it as an available client
        if (this.fikaMatchService.getMatchIdByProfile(UserSessionID)) {
            this.fikaMatchService.deleteMatch(UserSessionID);
        }

        this.fikaHeadlessService.addHeadlessClient(UserSessionID, ws);
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onMessage(sessionID: string, msg: string): void {
        // Do nothing
    }

    // biome-ignore lint/correctness/noUnusedVariables: Currently unused, but might be implemented in the future.
    public onClose(ws: SPTWebSocket, sessionID: string, code: number, reason: Buffer): void {
        const clientWebSocket = this.headlessWebSockets[sessionID];

        if (clientWebSocket === ws) {
            this.logger.debug(`[${this.getSocketId()}] Deleting client ${sessionID}`);

            delete this.headlessWebSockets[sessionID];
            this.fikaHeadlessService.removeHeadlessClient(sessionID);
        }
    }

    private async keepWebSocketAlive(): Promise<void> {
        for (const sessionId in this.headlessWebSockets) {
            const clientWebSocket = this.headlessWebSockets[sessionId];

            if (clientWebSocket.readyState === WebSocket.CLOSED) {
                delete this.headlessWebSockets[sessionId];
                this.fikaHeadlessService.removeHeadlessClient(sessionId);
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
