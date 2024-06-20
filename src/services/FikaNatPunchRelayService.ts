import { IncomingMessage } from "node:http";
import { inject, injectable } from "tsyringe";
import { WebSocket } from "ws";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";

@injectable()
export class FikaNatPunchRelayService implements IWebSocketConnectionHandler{
    protected webSockets: Record<string, WebSocket> = {};

    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("WinstonLogger") protected logger: ILogger,
    )
    {
        // Nothing here
    }

    public getSocketId(): string
    {
        return "FikaNatPunchRelayService";
    }

    public getHookUrl(): string
    {
        return "/fika/natpunchrelayservice/";
    }

    public onConnection(ws: WebSocket, req: IncomingMessage): void
    {
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();
        const playerProfile = this.profileHelper.getFullProfile(sessionID);

        this.webSockets[sessionID] = ws;

        this.logger.info(`${playerProfile.info.username} connected to FikaNatPunchRelayService`);

        ws.on("message", (msg) => this.onMessage(msg));
    }

    protected onMessage(msg: any) {
        const msgStr = msg.toString();
        const msgObj = JSON.parse(msgStr);

        if (msgObj.requestType == undefined) {
            this.logger.error(`Unhandled message in FikaNatPunchRelayService: ${msgStr}`);
            return;
        }

        switch (msgObj.requestType) {
            case "GetHostStunRequest":
                this.webSockets[msgObj.serverId].send(msgStr);
                break;
            case "GetHostStunResponse":
                this.webSockets[msgObj.sessionId].send(msgStr);
                break;
            default:
                this.logger.error(`Unhandled request type in FikaNatPunchRelayService: ${msgObj.requestType}`);
        }
    }
}
