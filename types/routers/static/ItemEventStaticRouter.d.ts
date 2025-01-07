import { ItemEventCallbacks } from "@spt/callbacks/ItemEventCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class ItemEventStaticRouter extends StaticRouter {
    protected itemEventCallbacks: ItemEventCallbacks;
    constructor(itemEventCallbacks: ItemEventCallbacks);
}
