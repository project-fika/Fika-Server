import { WishlistController } from "@spt/controllers/WishlistController";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IWishlistActionData } from "@spt/models/eft/wishlist/IWishlistActionData";
export declare class WishlistCallbacks {
    protected wishlistController: WishlistController;
    constructor(wishlistController: WishlistController);
    /** Handle AddToWishList event */
    addToWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveFromWishList event */
    removeFromWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
