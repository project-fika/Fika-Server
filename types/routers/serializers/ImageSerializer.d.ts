/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt-aki/di/Serializer";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
export declare class ImageSerializer extends Serializer {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(route: string): boolean;
}
