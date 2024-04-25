/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt-aki/di/Serializer";
import { BundleLoader } from "@spt-aki/loaders/BundleLoader";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { HttpFileUtil } from "@spt-aki/utils/HttpFileUtil";
export declare class BundleSerializer extends Serializer {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected httpFileUtil: HttpFileUtil;
    constructor(logger: ILogger, bundleLoader: BundleLoader, httpFileUtil: HttpFileUtil);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(route: string): boolean;
}
