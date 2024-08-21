import { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt/di/Serializer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { HttpRouter } from "@spt/routers/HttpRouter";
import { IHttpListener } from "@spt/servers/http/IHttpListener";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class SptHttpListener implements IHttpListener {
    protected httpRouter: HttpRouter;
    protected serializers: Serializer[];
    protected logger: ILogger;
    protected requestsLogger: ILogger;
    protected jsonUtil: JsonUtil;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    constructor(httpRouter: HttpRouter, // TODO: delay required
    serializers: Serializer[], logger: ILogger, requestsLogger: ILogger, jsonUtil: JsonUtil, httpResponse: HttpResponseUtil, localisationService: LocalisationService);
    canHandle(_: string, req: IncomingMessage): boolean;
    handle(sessionId: string, req: IncomingMessage, resp: ServerResponse): Promise<void>;
    /**
     * Send http response to the client
     * @param sessionID Player id
     * @param req Incoming request
     * @param resp Outgoing response
     * @param body Buffer
     * @param output Server generated response data
     */
    sendResponse(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: Buffer, output: string): void;
    getResponse(sessionID: string, req: IncomingMessage, body: Buffer): Promise<string>;
    protected getBodyInfo(body: Buffer, requestUrl?: any): any;
    sendJson(resp: ServerResponse, output: string, sessionID: string): void;
    sendZlibJson(resp: ServerResponse, output: string, sessionID: string): void;
}
