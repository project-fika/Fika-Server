import { BotCallbacks } from "@spt/callbacks/BotCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class BotDynamicRouter extends DynamicRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
