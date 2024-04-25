export interface IBundleCallbacks {
    sendBundle(sessionID: string, req: any, resp: any, body: any): any;
    getBundles(url: string, info: any, sessionID: string): string;
    getBundle(url: string, info: any, sessionID: string): string;
}
