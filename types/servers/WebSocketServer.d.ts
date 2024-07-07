/// <reference types="node" />
import http, { IncomingMessage } from "node:http";
import { WebSocket, Server } from "ws";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { LocalisationService } from "@spt/services/LocalisationService";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class WebSocketServer {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected httpServerHelper: HttpServerHelper;
    protected webSocketConnectionHandlers: IWebSocketConnectionHandler[];
    protected webSocketServer: Server;
    constructor(logger: ILogger, randomUtil: RandomUtil, jsonUtil: JsonUtil, localisationService: LocalisationService, httpServerHelper: HttpServerHelper, webSocketConnectionHandlers: IWebSocketConnectionHandler[]);
    getWebSocketServer(): Server;
    setupWebSocket(httpServer: http.Server): void;
    protected getRandomisedMessage(): string;
    protected wsOnConnection(ws: WebSocket, req: IncomingMessage): void;
}
