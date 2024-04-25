import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
export declare class RagfairOfferHolder {
    protected offersById: Map<string, IRagfairOffer>;
    protected offersByTemplate: Map<string, Map<string, IRagfairOffer>>;
    protected offersByTrader: Map<string, Map<string, IRagfairOffer>>;
    constructor();
    getOfferById(id: string): IRagfairOffer;
    getOffersByTemplate(templateId: string): Array<IRagfairOffer>;
    getOffersByTrader(traderId: string): Array<IRagfairOffer>;
    getOffers(): Array<IRagfairOffer>;
    addOffers(offers: Array<IRagfairOffer>): void;
    addOffer(offer: IRagfairOffer): void;
    /**
     * Purge offer from offer cache
     * @param offer Offer to remove
     */
    removeOffer(offer: IRagfairOffer): void;
    removeOffers(offers: Array<IRagfairOffer>): void;
    removeAllOffersByTrader(traderId: string): void;
    /**
     * Get an array of stale offers that are still shown to player
     * @returns IRagfairOffer array
     */
    getStaleOffers(time: number): Array<IRagfairOffer>;
    protected addOfferByTemplates(template: string, offer: IRagfairOffer): void;
    protected addOfferByTrader(trader: string, offer: IRagfairOffer): void;
    protected isStale(offer: IRagfairOffer, time: number): boolean;
}
