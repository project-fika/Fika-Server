import { IncomingMessage } from "node:http";
import https from "node:https";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { LocalisationService } from "@spt/services/LocalisationService";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { WebSocketServer as Server } from "ws";
import { SPTWebSocket } from "./ws/SPTWebsocket";
export declare class WebSocketServer {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected httpServerHelper: HttpServerHelper;
    protected webSocketConnectionHandlers: IWebSocketConnectionHandler[];
    protected webSocketServer: Server | undefined;
    constructor(logger: ILogger, randomUtil: RandomUtil, jsonUtil: JsonUtil, localisationService: LocalisationService, httpServerHelper: HttpServerHelper, webSocketConnectionHandlers: IWebSocketConnectionHandler[]);
    getWebSocketServer(): Server | undefined;
    setupWebSocket(httpServer: https.Server): void;
    protected getRandomisedMessage(): string;
    protected wsOnConnection(ws: SPTWebSocket, req: IncomingMessage): Promise<void>;
}
