/// <reference types="node" />
import { ServerResponse } from "node:http";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
export declare class HttpFileUtil {
    protected httpServerHelper: HttpServerHelper;
    constructor(httpServerHelper: HttpServerHelper);
    sendFile(resp: ServerResponse, filePath: string): void;
}
