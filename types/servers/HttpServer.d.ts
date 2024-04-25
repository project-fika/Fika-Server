/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { WebSocketServer } from "@spt-aki/servers/WebSocketServer";
import { IHttpListener } from "@spt-aki/servers/http/IHttpListener";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
export declare class HttpServer {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected httpServerHelper: HttpServerHelper;
    protected localisationService: LocalisationService;
    protected httpListeners: IHttpListener[];
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected webSocketServer: WebSocketServer;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, httpServerHelper: HttpServerHelper, localisationService: LocalisationService, httpListeners: IHttpListener[], configServer: ConfigServer, applicationContext: ApplicationContext, webSocketServer: WebSocketServer);
    /**
     * Handle server loading event
     */
    load(): void;
    protected handleRequest(req: IncomingMessage, resp: ServerResponse): void;
    protected getCookies(req: IncomingMessage): Record<string, string>;
}
