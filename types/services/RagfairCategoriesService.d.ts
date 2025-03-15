import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
export declare class RagfairCategoriesService {
    protected logger: ILogger;
    protected paymentHelper: PaymentHelper;
    constructor(logger: ILogger, paymentHelper: PaymentHelper);
    /**
     * Get a dictionary of each item the play can see in their flea menu, filtered by what is available for them to buy
     * @param offers All offers in flea
     * @param searchRequestData Search criteria requested
     * @param fleaUnlocked Can player see full flea yet (level 15 by default)
     * @returns KVP of item tpls + count of offers
     */
    getCategoriesFromOffers(offers: IRagfairOffer[], searchRequestData: ISearchRequestData, fleaUnlocked: boolean): Record<string, number>;
}
