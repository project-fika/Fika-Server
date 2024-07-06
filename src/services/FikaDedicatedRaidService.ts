import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { IDedicatedClientInfo } from "../models/fika/IDedicatedClientInfo";
import { WebSocketServer } from "@spt/servers/WebSocketServer";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";

@injectable()
export class FikaDedicatedRaidService implements IWebSocketConnectionHandler{
    public clientWebSockets: Record<string, WebSocket>;
    public dedicatedClients: Record<string, IDedicatedClientInfo>;
    public requestedSessions: Record<string, string>;
    public onNoDedicatedClientAvailable?: () => void;
    public onDedicatedClientAvailable?: () => void;
    public onDedicatedClientResponse?: (sessionID: string) => void;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("WebSocketServer") protected webSocketServer: WebSocketServer,
    ) {
        this.clientWebSockets = {};
        this.dedicatedClients = {};
        this.requestedSessions = {};

        // TODO: find a more elegant solution to keep track of dedicated clients being available.
        setInterval(() => {
            const currentTime = Date.now();

            for (const dedicatedClientSessionId in this.dedicatedClients) {
                const dedicatedClientLastPing = this.dedicatedClients[dedicatedClientSessionId].lastPing;

                if (currentTime - dedicatedClientLastPing > 16000) {
                    delete this.dedicatedClients[dedicatedClientSessionId];
                    logger.info(`Dedicated client removed: ${dedicatedClientSessionId}`);
                }

                if(!this.isDedicatedClientAvailable()) {
                    if(this.onNoDedicatedClientAvailable) {
                        this.onNoDedicatedClientAvailable();
                    }
                }
            }
        }, 5000);
    }

    public getSocketId(): string
    {
        return "FikaDedicatedRaidService";
    }

    public getHookUrl(): string
    {
        return "/fika/dedicatedraidservice/";
    }

    public onConnection(ws: WebSocket, req: IncomingMessage): void
    {
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();

        this.clientWebSockets[sessionID] = ws;

        ws.on("message", (msg) => this.onMessage(sessionID, msg.toString()));
    }

    public onMessage(sessionID: string, msg: string) {
        // Do Nothing
    }

    public handleRequestedSessions(matchId: string): void {
        if (matchId in this.requestedSessions) {
            const userToJoin = this.requestedSessions[matchId];
            delete this.requestedSessions[matchId];

            this.clientWebSockets[userToJoin].send(JSON.stringify(
                {
                    type: "fikaDedicatedJoinMatch",
                    matchId: matchId
                }
            ));

            this.logger.info(`Told ${userToJoin} to join raid ${matchId}`);
        }
    }

    public isDedicatedClientAvailable(): boolean {
        return Object.keys(this.dedicatedClients).length > 0;
    }
}
