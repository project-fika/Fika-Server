import { OnLoad } from "@spt-aki/di/OnLoad";
import { HttpServer } from "@spt-aki/servers/HttpServer";
export declare class HttpCallbacks implements OnLoad {
    protected httpServer: HttpServer;
    constructor(httpServer: HttpServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    getImage(): string;
}
