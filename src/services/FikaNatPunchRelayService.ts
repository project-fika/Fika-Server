import { IncomingMessage } from "node:http";
import { inject, injectable } from "tsyringe";
import { WebSocket, Server } from "ws";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";

@injectable()
export class FikaNatPunchRelayService {

    protected webSocketServer: Server;
    protected webSockets: Record<string, WebSocket> = {};

    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("WinstonLogger") protected logger: ILogger)
        {}

    public start(): void {

        this.webSocketServer = new Server({ port: 6970 });

        this.webSocketServer.addListener("listening", () =>
        {
            this.logger.success("FikaNatPunchService started on port 6970");
        });

        this.webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
    }

    protected wsOnConnection(ws: WebSocket, req: IncomingMessage): void
    {
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();
        const playerProfile = this.profileHelper.getFullProfile(sessionID);

        this.webSockets[sessionID] = ws;

        this.logger.info(`${playerProfile.info.username} connected to FikaNatPunchService`);
        ws.on("message", (msg) => this.wsOnMessage(playerProfile, msg));
    }

    protected wsOnMessage(playerProfile: ISptProfile, msg: any) {
        this.logger.info(`Received: ${msg}`);

        const msgObj = JSON.parse(msg.toString());

        if(msgObj.requestType == undefined)
            return;

        switch(msgObj.requestType)
        {
            case "GetHostStunRequest":
                this.logger.info(`sending GetHostStunRequest to server: ${msgObj.serverId}`);
                this.webSockets[msgObj.serverId].send(msg.toString());
            break;
            case "GetHostStunResponse":
                this.logger.info(`sending GetHostStunResponse to client: ${msgObj.clientId}`);
                this.webSockets[msgObj.clientId].send(msg.toString());
            break;
        }
    }
}
