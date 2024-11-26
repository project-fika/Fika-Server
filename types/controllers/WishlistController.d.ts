import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IAddToWishlistRequest } from "@spt/models/eft/wishlist/IAddToWishlistRequest";
import { IChangeWishlistItemCategoryRequest } from "@spt/models/eft/wishlist/IChangeWishlistItemCategoryRequest";
import { IRemoveFromWishlistRequest } from "@spt/models/eft/wishlist/IRemoveFromWishlistRequest";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
export declare class WishlistController {
    protected eventOutputHolder: EventOutputHolder;
    constructor(eventOutputHolder: EventOutputHolder);
    /** Handle AddToWishList */
    addToWishList(pmcData: IPmcData, request: IAddToWishlistRequest, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveFromWishList event */
    removeFromWishList(pmcData: IPmcData, request: IRemoveFromWishlistRequest, sessionID: string): IItemEventRouterResponse;
    /** Handle changeWishlistItemCategory event */
    changeWishlistItemCategory(pmcData: IPmcData, request: IChangeWishlistItemCategoryRequest, sessionID: string): IItemEventRouterResponse;
}
