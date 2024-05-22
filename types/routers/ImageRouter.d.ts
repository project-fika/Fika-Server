/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { ImageRouteService } from "@spt/services/mod/image/ImageRouteService";
import { HttpFileUtil } from "@spt/utils/HttpFileUtil";
import { VFS } from "@spt/utils/VFS";
export declare class ImageRouter {
    protected vfs: VFS;
    protected imageRouteService: ImageRouteService;
    protected httpFileUtil: HttpFileUtil;
    constructor(vfs: VFS, imageRouteService: ImageRouteService, httpFileUtil: HttpFileUtil);
    addRoute(key: string, valueToAdd: string): void;
    sendImage(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    getImage(): string;
}
