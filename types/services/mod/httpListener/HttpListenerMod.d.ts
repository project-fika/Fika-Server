/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
import { IHttpListener } from "@spt/servers/http/IHttpListener";
export declare class HttpListenerMod implements IHttpListener {
    private canHandleOverride;
    private handleOverride;
    constructor(canHandleOverride: (sessionId: string, req: IncomingMessage) => boolean, handleOverride: (sessionId: string, req: IncomingMessage, resp: ServerResponse) => void);
    canHandle(sessionId: string, req: IncomingMessage): boolean;
    handle(sessionId: string, req: IncomingMessage, resp: ServerResponse): Promise<void>;
}
