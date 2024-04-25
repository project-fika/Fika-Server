import { BotCallbacks } from "@spt-aki/callbacks/BotCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class BotDynamicRouter extends DynamicRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
