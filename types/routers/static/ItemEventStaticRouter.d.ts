import { ItemEventCallbacks } from "@spt-aki/callbacks/ItemEventCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class ItemEventStaticRouter extends StaticRouter {
    protected itemEventCallbacks: ItemEventCallbacks;
    constructor(itemEventCallbacks: ItemEventCallbacks);
}
