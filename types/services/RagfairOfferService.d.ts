import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RagfairServerHelper } from "@spt/helpers/RagfairServerHelper";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { RagfairOfferHolder } from "@spt/utils/RagfairOfferHolder";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class RagfairOfferService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected saveServer: SaveServer;
    protected ragfairServerHelper: RagfairServerHelper;
    protected profileHelper: ProfileHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected playerOffersLoaded: boolean;
    /** Offer id + offer object */
    protected expiredOffers: Record<string, IRagfairOffer>;
    protected ragfairConfig: IRagfairConfig;
    protected ragfairOfferHandler: RagfairOfferHolder;
    constructor(logger: ILogger, timeUtil: TimeUtil, databaseService: DatabaseService, saveServer: SaveServer, ragfairServerHelper: RagfairServerHelper, profileHelper: ProfileHelper, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Get all offers
     * @returns IRagfairOffer array
     */
    getOffers(): IRagfairOffer[];
    getOfferByOfferId(offerId: string): IRagfairOffer | undefined;
    getOffersOfType(templateId: string): IRagfairOffer[] | undefined;
    addOffer(offer: IRagfairOffer): void;
    addOfferToExpired(staleOffer: IRagfairOffer): void;
    /**
     * Get total count of current expired offers
     * @returns Number of expired offers
     */
    getExpiredOfferCount(): number;
    /**
     * Get an array of arrays of expired offer items + children
     * @returns Expired offer assorts
     */
    getExpiredOfferAssorts(): Item[][];
    /**
     * Clear out internal expiredOffers dictionary of all items
     */
    resetExpiredOffers(): void;
    /**
     * Does the offer exist on the ragfair
     * @param offerId offer id to check for
     * @returns offer exists - true
     */
    doesOfferExist(offerId: string): boolean;
    /**
     * Remove an offer from ragfair by offer id
     * @param offerId Offer id to remove
     */
    removeOfferById(offerId: string): void;
    /**
     * Reduce size of an offer stack by specified amount
     * @param offerId Offer to adjust stack size of
     * @param amount How much to deduct from offers stack size
     */
    removeOfferStack(offerId: string, amount: number): void;
    removeAllOffersByTrader(traderId: string): void;
    /**
     * Do the trader offers on flea need to be refreshed
     * @param traderID Trader to check
     * @returns true if they do
     */
    traderOffersNeedRefreshing(traderID: string): boolean;
    addPlayerOffers(): void;
    expireStaleOffers(): void;
    /**
     * Remove stale offer from flea
     * @param staleOffer Stale offer to process
     */
    protected processStaleOffer(staleOffer: IRagfairOffer): void;
    protected returnPlayerOffer(playerOffer: IRagfairOffer): void;
}
