import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
import { RagfairSort } from "@spt-aki/models/enums/RagfairSort";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocaleService } from "@spt-aki/services/LocaleService";
export declare class RagfairSortHelper {
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    constructor(databaseServer: DatabaseServer, localeService: LocaleService);
    /**
     * Sort a list of ragfair offers by something (id/rating/offer name/price/expiry time)
     * @param offers Offers to sort
     * @param type How to sort it
     * @param direction Ascending/descending
     * @returns Sorted offers
     */
    sortOffers(offers: IRagfairOffer[], type: RagfairSort, direction?: number): IRagfairOffer[];
    protected sortOffersByID(a: IRagfairOffer, b: IRagfairOffer): number;
    protected sortOffersByRating(a: IRagfairOffer, b: IRagfairOffer): number;
    protected sortOffersByName(a: IRagfairOffer, b: IRagfairOffer): number;
    /**
     * Order two offers by rouble price value
     * @param a Offer a
     * @param b Offer b
     * @returns
     */
    protected sortOffersByPrice(a: IRagfairOffer, b: IRagfairOffer): number;
    protected sortOffersByExpiry(a: IRagfairOffer, b: IRagfairOffer): number;
}
