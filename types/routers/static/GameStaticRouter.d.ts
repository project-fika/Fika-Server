import { GameCallbacks } from "@spt/callbacks/GameCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class GameStaticRouter extends StaticRouter {
    protected httpResponse: HttpResponseUtil;
    protected gameCallbacks: GameCallbacks;
    constructor(httpResponse: HttpResponseUtil, gameCallbacks: GameCallbacks);
}
