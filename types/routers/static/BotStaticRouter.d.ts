import { BotCallbacks } from "@spt/callbacks/BotCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class BotStaticRouter extends StaticRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
