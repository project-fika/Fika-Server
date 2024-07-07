/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IHttpListener } from "@spt/servers/http/IHttpListener";
import { WebSocketServer } from "@spt/servers/WebSocketServer";
import { LocalisationService } from "@spt/services/LocalisationService";
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
    protected started: boolean;
    constructor(logger: ILogger, databaseServer: DatabaseServer, httpServerHelper: HttpServerHelper, localisationService: LocalisationService, httpListeners: IHttpListener[], configServer: ConfigServer, applicationContext: ApplicationContext, webSocketServer: WebSocketServer);
    /**
     * Handle server loading event
     */
    load(): void;
    protected handleRequest(req: IncomingMessage, resp: ServerResponse): void;
    /**
     * Check against hardcoded values that determine its from a local address
     * @param remoteAddress Address to check
     * @returns True if its local
     */
    protected isLocalRequest(remoteAddress: string): boolean;
    protected getCookies(req: IncomingMessage): Record<string, string>;
    isStarted(): boolean;
}
