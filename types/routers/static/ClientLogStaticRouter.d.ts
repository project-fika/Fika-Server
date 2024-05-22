import { ClientLogCallbacks } from "@spt/callbacks/ClientLogCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class ClientLogStaticRouter extends StaticRouter {
    protected clientLogCallbacks: ClientLogCallbacks;
    constructor(clientLogCallbacks: ClientLogCallbacks);
}
