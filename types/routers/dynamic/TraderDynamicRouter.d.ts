import { TraderCallbacks } from "@spt/callbacks/TraderCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class TraderDynamicRouter extends DynamicRouter {
    protected traderCallbacks: TraderCallbacks;
    constructor(traderCallbacks: TraderCallbacks);
}
