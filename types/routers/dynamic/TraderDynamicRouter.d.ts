import { TraderCallbacks } from "@spt-aki/callbacks/TraderCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class TraderDynamicRouter extends DynamicRouter {
    protected traderCallbacks: TraderCallbacks;
    constructor(traderCallbacks: TraderCallbacks);
}
