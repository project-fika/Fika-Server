import { RagfairCallbacks } from "@spt/callbacks/RagfairCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class RagfairStaticRouter extends StaticRouter {
    protected ragfairCallbacks: RagfairCallbacks;
    constructor(ragfairCallbacks: RagfairCallbacks);
}
