import { BotCallbacks } from "@spt-aki/callbacks/BotCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class BotStaticRouter extends StaticRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
