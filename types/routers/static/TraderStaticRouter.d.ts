import { TraderCallbacks } from "@spt-aki/callbacks/TraderCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class TraderStaticRouter extends StaticRouter {
    protected traderCallbacks: TraderCallbacks;
    constructor(traderCallbacks: TraderCallbacks);
}
