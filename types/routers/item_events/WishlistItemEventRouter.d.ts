import { WishlistCallbacks } from "@spt-aki/callbacks/WishlistCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export declare class WishlistItemEventRouter extends ItemEventRouterDefinition {
    protected wishlistCallbacks: WishlistCallbacks;
    constructor(wishlistCallbacks: WishlistCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
