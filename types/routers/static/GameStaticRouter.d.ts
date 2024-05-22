import { GameCallbacks } from "@spt/callbacks/GameCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class GameStaticRouter extends StaticRouter {
    protected gameCallbacks: GameCallbacks;
    constructor(gameCallbacks: GameCallbacks);
}
