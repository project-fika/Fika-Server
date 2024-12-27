import type { PrestigeCallbacks } from "@project/src/callbacks/PrestigeCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class PrestigeStaticRouter extends StaticRouter {
    protected prestigeCallbacks: PrestigeCallbacks;
    constructor(prestigeCallbacks: PrestigeCallbacks);
}
