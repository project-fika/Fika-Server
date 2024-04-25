/// <reference types="node" />
import http, { IncomingMessage } from "node:http";
import WebSocket from "ws";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { INotification } from "@spt-aki/models/eft/notifier/INotifier";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class WebSocketServer {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected jsonUtil: JsonUtil;
    protected httpServerHelper: HttpServerHelper;
    protected profileHelper: ProfileHelper;
    constructor(logger: ILogger, randomUtil: RandomUtil, configServer: ConfigServer, localisationService: LocalisationService, jsonUtil: JsonUtil, httpServerHelper: HttpServerHelper, profileHelper: ProfileHelper);
    protected httpConfig: IHttpConfig;
    protected defaultNotification: INotification;
    protected webSockets: Record<string, WebSocket.WebSocket>;
    protected websocketPingHandler: any;
    setupWebSocket(httpServer: http.Server): void;
    sendMessage(sessionID: string, output: INotification): void;
    protected getRandomisedMessage(): string;
    isConnectionWebSocket(sessionID: string): boolean;
    protected wsOnConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void;
}
