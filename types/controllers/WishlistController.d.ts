import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IWishlistActionData } from "@spt-aki/models/eft/wishlist/IWishlistActionData";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
export declare class WishlistController {
    protected eventOutputHolder: EventOutputHolder;
    constructor(eventOutputHolder: EventOutputHolder);
    /** Handle AddToWishList */
    addToWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveFromWishList event */
    removeFromWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
