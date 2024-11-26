import { IncomingMessage, ServerResponse } from "node:http";
export declare class Serializer {
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): Promise<void>;
    canHandle(something: string): boolean;
}
