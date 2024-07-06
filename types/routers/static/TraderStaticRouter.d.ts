import { TraderCallbacks } from "@spt/callbacks/TraderCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class TraderStaticRouter extends StaticRouter {
    protected traderCallbacks: TraderCallbacks;
    constructor(traderCallbacks: TraderCallbacks);
}
