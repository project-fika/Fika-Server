import { IncomingMessage } from "node:http";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { Server, WebSocket } from "ws";
import { FikaConfig } from "../utils/FikaConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IFikaConfig } from "../models/fika/config/IFikaConfig";

@injectable()
export class FikaNatPunchRelayService {
    public Host: string;
    public Port: number;
    protected webSocketServer: Server;
    protected webSockets: Record<string, WebSocket> = {};
    protected httpConfig: IHttpConfig;
    protected fikaConfig: IFikaConfig;

    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("FikaConfig") protected fikaConfigServer: FikaConfig,
    ) {
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
        this.fikaConfig = this.fikaConfigServer.getConfig();

        this.Host = this.httpConfig.backendIp;
        this.Port = this.fikaConfig.server.natPunchRelayServicePort;
    }

    public start(): void {
        this.webSocketServer = new Server({ host: this.Host, port: this.Port });

        this.webSocketServer.addListener("listening", () => {
            this.logger.success(`Started FikaNatPunchRelayService at ws://${this.Host}:${this.Port}`);
        });

        this.webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
    }

    protected wsOnConnection(ws: WebSocket, req: IncomingMessage): void {
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();
        const playerProfile = this.profileHelper.getFullProfile(sessionID);

        this.webSockets[sessionID] = ws;

        this.logger.info(`${playerProfile.info.username} connected to FikaNatPunchRelayService`);

        ws.on("message", (msg) => this.wsOnMessage(playerProfile, msg));
    }

    protected wsOnMessage(playerProfile: ISptProfile, msg: any) {
        const msgStr = msg.toString();
        const msgObj = JSON.parse(msgStr);

        if (msgObj.requestType == undefined) return;

        switch (msgObj.requestType) {
            case "GetHostStunRequest":
                this.webSockets[msgObj.serverId].send(msgStr);
                break;
            case "GetHostStunResponse":
                this.webSockets[msgObj.sessionId].send(msgStr);
                break;
        }
    }
}
