import { GameCallbacks } from "@spt-aki/callbacks/GameCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class GameStaticRouter extends StaticRouter {
    protected gameCallbacks: GameCallbacks;
    constructor(gameCallbacks: GameCallbacks);
}
