import { RagfairCallbacks } from "@spt-aki/callbacks/RagfairCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class RagfairStaticRouter extends StaticRouter {
    protected ragfairCallbacks: RagfairCallbacks;
    constructor(ragfairCallbacks: RagfairCallbacks);
}
