import { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt/di/Serializer";
import { BundleLoader } from "@spt/loaders/BundleLoader";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { HttpFileUtil } from "@spt/utils/HttpFileUtil";
export declare class BundleSerializer extends Serializer {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected httpFileUtil: HttpFileUtil;
    constructor(logger: ILogger, bundleLoader: BundleLoader, httpFileUtil: HttpFileUtil);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): Promise<void>;
    canHandle(route: string): boolean;
}
