export interface IModCallbacks {
    load(): void;
    sendBundle(sessionID: string, req: any, resp: any, body: any): void;
    getBundles(url: string, info: any, sessionID: string): string;
    getBundle(url: string, info: any, sessionID: string): string;
}
