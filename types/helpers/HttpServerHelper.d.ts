import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
export declare class HttpServerHelper {
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    protected mime: {
        css: string;
        bin: string;
        html: string;
        jpg: string;
        js: string;
        json: string;
        png: string;
        svg: string;
        txt: string;
    };
    constructor(configServer: ConfigServer);
    getMimeText(key: string): string;
    /**
     * Combine ip and port into url
     * @returns url
     */
    buildUrl(): string;
    /**
     * Prepend http to the url:port
     * @returns URI
     */
    getBackendUrl(): string;
    /** Get websocket url + port */
    getWebsocketUrl(): string;
    sendTextJson(resp: any, output: any): void;
}
