import { MatchCallbacks } from "@spt/callbacks/MatchCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class MatchStaticRouter extends StaticRouter {
    protected matchCallbacks: MatchCallbacks;
    constructor(matchCallbacks: MatchCallbacks);
}
