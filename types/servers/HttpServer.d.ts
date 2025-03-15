import { IncomingMessage, ServerResponse } from "node:http";
import { Server } from "node:https";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { WebSocketServer } from "@spt/servers/WebSocketServer";
import { IHttpListener } from "@spt/servers/http/IHttpListener";
import { LocalisationService } from "@spt/services/LocalisationService";
import { FileSystem } from "@spt/utils/FileSystem";
export declare class HttpServer {
    protected logger: ILogger;
    protected httpServerHelper: HttpServerHelper;
    protected localisationService: LocalisationService;
    protected httpListeners: IHttpListener[];
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected webSocketServer: WebSocketServer;
    protected httpConfig: IHttpConfig;
    protected started: boolean;
    protected certPath: string;
    protected keyPath: string;
    protected fileSystem: FileSystem;
    constructor(logger: ILogger, httpServerHelper: HttpServerHelper, localisationService: LocalisationService, httpListeners: IHttpListener[], configServer: ConfigServer, applicationContext: ApplicationContext, webSocketServer: WebSocketServer, fileSystem: FileSystem);
    /**
     * Handle server loading event
     */
    load(): Promise<void>;
    /**
     * Creates an HTTPS server using the stored certificate and key.
     */
    protected createHttpsServer(): Promise<Server>;
    /**
     * Generates a self-signed certificate and returns an object with the cert and key.
     */
    protected generateSelfSignedCertificate(): Promise<{
        cert: string;
        key: string;
    }>;
    protected handleRequest(req: IncomingMessage, resp: ServerResponse): Promise<void>;
    /**
     * Check against hardcoded values that determine its from a local address
     * @param remoteAddress Address to check
     * @returns True if its local
     */
    protected isLocalRequest(remoteAddress: string | undefined): boolean | undefined;
    protected getCookies(req: IncomingMessage): Record<string, string>;
    isStarted(): boolean;
}
