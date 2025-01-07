import { IncomingMessage, ServerResponse } from "node:http";
export interface IHttpListener {
    canHandle(sessionId: string, req: IncomingMessage): boolean;
    handle(sessionId: string, req: IncomingMessage, resp: ServerResponse): Promise<void>;
}
