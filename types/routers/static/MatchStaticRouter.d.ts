import { MatchCallbacks } from "@spt-aki/callbacks/MatchCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class MatchStaticRouter extends StaticRouter {
    protected matchCallbacks: MatchCallbacks;
    constructor(matchCallbacks: MatchCallbacks);
}
