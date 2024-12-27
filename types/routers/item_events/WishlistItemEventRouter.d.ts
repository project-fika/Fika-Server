import { WishlistCallbacks } from "@spt/callbacks/WishlistCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export declare class WishlistItemEventRouter extends ItemEventRouterDefinition {
    protected wishlistCallbacks: WishlistCallbacks;
    constructor(wishlistCallbacks: WishlistCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, request: any, sessionID: string): Promise<IItemEventRouterResponse>;
}
