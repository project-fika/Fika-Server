export interface IHttpCallbacks {
    load(): void;
    sendImage(sessionID: string, req: any, resp: any, body: any): void;
    getImage(): string;
}
