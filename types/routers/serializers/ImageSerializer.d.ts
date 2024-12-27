import type { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt/di/Serializer";
import type { ImageRouter } from "@spt/routers/ImageRouter";
export declare class ImageSerializer extends Serializer {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): Promise<void>;
    canHandle(route: string): boolean;
}
