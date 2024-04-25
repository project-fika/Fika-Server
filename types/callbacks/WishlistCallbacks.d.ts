import { WishlistController } from "@spt-aki/controllers/WishlistController";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IWishlistActionData } from "@spt-aki/models/eft/wishlist/IWishlistActionData";
export declare class WishlistCallbacks {
    protected wishlistController: WishlistController;
    constructor(wishlistController: WishlistController);
    /** Handle AddToWishList event */
    addToWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveFromWishList event */
    removeFromWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
