import { IncomingMessage, ServerResponse } from "node:http";
import { NotifierController } from "@spt/controllers/NotifierController";
import { Serializer } from "@spt/di/Serializer";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class NotifySerializer extends Serializer {
    protected notifierController: NotifierController;
    protected jsonUtil: JsonUtil;
    protected httpServerHelper: HttpServerHelper;
    constructor(notifierController: NotifierController, jsonUtil: JsonUtil, httpServerHelper: HttpServerHelper);
    serialize(_sessionID: string, req: IncomingMessage, resp: ServerResponse, _: any): void;
    canHandle(route: string): boolean;
}
