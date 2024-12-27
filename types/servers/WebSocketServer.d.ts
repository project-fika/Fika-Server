import http, { IncomingMessage } from "node:http";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import type { IWebSocketConnectionHandler } from "@spt/servers/ws/IWebSocketConnectionHandler";
import { LocalisationService } from "@spt/services/LocalisationService";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { WebSocketServer as WSServer, WebSocket } from "ws";
export declare class WebSocketServer {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected httpServerHelper: HttpServerHelper;
    protected webSocketConnectionHandlers: IWebSocketConnectionHandler[];
    protected webSocketServer: WSServer;
    constructor(logger: ILogger, randomUtil: RandomUtil, jsonUtil: JsonUtil, localisationService: LocalisationService, httpServerHelper: HttpServerHelper, webSocketConnectionHandlers: IWebSocketConnectionHandler[]);
    getWebSocketServer(): WSServer;
    setupWebSocket(httpServer: http.Server): void;
    protected getRandomisedMessage(): string;
    protected wsOnConnection(ws: WebSocket, req: IncomingMessage): void;
}
