import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { IDedicatedClientInfo } from "../models/fika/dedicated/IDedicatedClientInfo";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";

@injectable()
export class FikaDedicatedRaidWebSocket implements IWebSocketConnectionHandler{
    public clientWebSockets: Record<string, WebSocket>;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
    ) {

        this.clientWebSockets = {};

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

        this.logger.info(`${sessionID} connected to FikaDedicatedRaidService`);

        ws.on("message", (msg) => this.onMessage(sessionID, msg.toString()));
    }

    public onMessage(sessionID: string, msg: string) {
        // Do Nothing
    }
}
