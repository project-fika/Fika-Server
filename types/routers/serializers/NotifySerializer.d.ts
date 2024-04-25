/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { NotifierController } from "@spt-aki/controllers/NotifierController";
import { Serializer } from "@spt-aki/di/Serializer";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class NotifySerializer extends Serializer {
    protected notifierController: NotifierController;
    protected jsonUtil: JsonUtil;
    protected httpServerHelper: HttpServerHelper;
    constructor(notifierController: NotifierController, jsonUtil: JsonUtil, httpServerHelper: HttpServerHelper);
    serialize(_sessionID: string, req: IncomingMessage, resp: ServerResponse, _: any): void;
    canHandle(route: string): boolean;
}
