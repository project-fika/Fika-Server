import { WishlistController } from "@spt/controllers/WishlistController";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IAddToWishlistRequest } from "@spt/models/eft/wishlist/IAddToWishlistRequest";
import type { IChangeWishlistItemCategoryRequest } from "@spt/models/eft/wishlist/IChangeWishlistItemCategoryRequest";
import type { IRemoveFromWishlistRequest } from "@spt/models/eft/wishlist/IRemoveFromWishlistRequest";
export declare class WishlistCallbacks {
    protected wishlistController: WishlistController;
    constructor(wishlistController: WishlistController);
    /** Handle AddToWishList event */
    addToWishlist(pmcData: IPmcData, request: IAddToWishlistRequest, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveFromWishList event */
    removeFromWishlist(pmcData: IPmcData, request: IRemoveFromWishlistRequest, sessionID: string): IItemEventRouterResponse;
    /** Handle ChangeWishlistItemCategory */
    changeWishlistItemCategory(pmcData: IPmcData, request: IChangeWishlistItemCategoryRequest, sessionID: string): IItemEventRouterResponse;
}
