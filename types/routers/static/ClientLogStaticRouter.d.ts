import { ClientLogCallbacks } from "@spt-aki/callbacks/ClientLogCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class ClientLogStaticRouter extends StaticRouter {
    protected clientLogCallbacks: ClientLogCallbacks;
    constructor(clientLogCallbacks: ClientLogCallbacks);
}
