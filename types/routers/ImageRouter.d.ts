import { IncomingMessage, ServerResponse } from "node:http";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImageRouteService } from "@spt/services/mod/image/ImageRouteService";
import { HttpFileUtil } from "@spt/utils/HttpFileUtil";
export declare class ImageRouter {
    protected logger: ILogger;
    protected imageRouteService: ImageRouteService;
    protected httpFileUtil: HttpFileUtil;
    constructor(logger: ILogger, imageRouteService: ImageRouteService, httpFileUtil: HttpFileUtil);
    addRoute(key: string, valueToAdd: string): void;
    sendImage(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): Promise<void>;
    getImage(): string;
}
