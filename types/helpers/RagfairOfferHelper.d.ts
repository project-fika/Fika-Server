import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PaymentHelper } from "@spt-aki/helpers/PaymentHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { RagfairHelper } from "@spt-aki/helpers/RagfairHelper";
import { RagfairServerHelper } from "@spt-aki/helpers/RagfairServerHelper";
import { RagfairSortHelper } from "@spt-aki/helpers/RagfairSortHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { IQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LocaleService } from "@spt-aki/services/LocaleService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { RagfairRequiredItemsService } from "@spt-aki/services/RagfairRequiredItemsService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class RagfairOfferHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected traderHelper: TraderHelper;
    protected saveServer: SaveServer;
    protected itemHelper: ItemHelper;
    protected paymentHelper: PaymentHelper;
    protected presetHelper: PresetHelper;
    protected profileHelper: ProfileHelper;
    protected ragfairServerHelper: RagfairServerHelper;
    protected ragfairSortHelper: RagfairSortHelper;
    protected ragfairHelper: RagfairHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected ragfairRequiredItemsService: RagfairRequiredItemsService;
    protected localeService: LocaleService;
    protected localisationService: LocalisationService;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected static goodSoldTemplate: string;
    protected ragfairConfig: IRagfairConfig;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, traderHelper: TraderHelper, saveServer: SaveServer, itemHelper: ItemHelper, paymentHelper: PaymentHelper, presetHelper: PresetHelper, profileHelper: ProfileHelper, ragfairServerHelper: RagfairServerHelper, ragfairSortHelper: RagfairSortHelper, ragfairHelper: RagfairHelper, ragfairOfferService: RagfairOfferService, ragfairRequiredItemsService: RagfairRequiredItemsService, localeService: LocaleService, localisationService: LocalisationService, mailSendService: MailSendService, configServer: ConfigServer);
    /**
     * Passthrough to ragfairOfferService.getOffers(), get flea offers a player should see
     * @param searchRequest Data from client
     * @param itemsToAdd ragfairHelper.filterCategories()
     * @param traderAssorts Trader assorts
     * @param pmcData Player profile
     * @returns Offers the player should see
     */
    getValidOffers(searchRequest: ISearchRequestData, itemsToAdd: string[], traderAssorts: Record<string, ITraderAssort>, pmcData: IPmcData): IRagfairOffer[];
    /**
     * Get matching offers that require the desired item and filter out offers from non traders if player is below ragfair unlock level
     * @param searchRequest Search request from client
     * @param pmcDataPlayer profile
     * @returns Matching IRagfairOffer objects
     */
    getOffersThatRequireItem(searchRequest: ISearchRequestData, pmcData: IPmcData): IRagfairOffer[];
    /**
     * Get offers from flea/traders specifically when building weapon preset
     * @param searchRequest Search request data
     * @param itemsToAdd string array of item tpls to search for
     * @param traderAssorts All trader assorts player can access/buy
     * @param pmcData Player profile
     * @returns IRagfairOffer array
     */
    getOffersForBuild(searchRequest: ISearchRequestData, itemsToAdd: string[], traderAssorts: Record<string, ITraderAssort>, pmcData: IPmcData): IRagfairOffer[];
    /**
     * Check if offer is from trader standing the player does not have
     * @param offer Offer to check
     * @param pmcProfile Player profile
     * @returns True if item is locked, false if item is purchaseable
     */
    protected traderOfferLockedBehindLoyaltyLevel(offer: IRagfairOffer, pmcProfile: IPmcData): boolean;
    /**
     * Check if offer item is quest locked for current player by looking at sptQuestLocked property in traders barter_scheme
     * @param offer Offer to check is quest locked
     * @param traderAssorts all trader assorts for player
     * @returns true if quest locked
     */
    traderOfferItemQuestLocked(offer: IRagfairOffer, traderAssorts: Record<string, ITraderAssort>): boolean;
    /**
     * Has a traders offer ran out of stock to sell to player
     * @param offer Offer to check stock of
     * @returns true if out of stock
     */
    protected traderOutOfStock(offer: IRagfairOffer): boolean;
    /**
     * Check if trader offers' BuyRestrictionMax value has been reached
     * @param offer offer to check restriction properties of
     * @returns true if restriction reached, false if no restrictions/not reached
     */
    protected traderBuyRestrictionReached(offer: IRagfairOffer): boolean;
    /**
     * Get an array of flea offers that are inaccessible to player due to their inadequate loyalty level
     * @param offers Offers to check
     * @param pmcProfile Players profile with trader loyalty levels
     * @returns array of offer ids player cannot see
     */
    protected getLoyaltyLockedOffers(offers: IRagfairOffer[], pmcProfile: IPmcData): string[];
    /**
     * Process all player-listed flea offers for a desired profile
     * @param sessionID Session id to process offers for
     * @returns true = complete
     */
    processOffersOnProfile(sessionID: string): boolean;
    /**
     * Add amount to players ragfair rating
     * @param sessionId Profile to update
     * @param amountToIncrementBy Raw amount to add to players ragfair rating (excluding the reputation gain multiplier)
     */
    increaseProfileRagfairRating(profile: IAkiProfile, amountToIncrementBy: number): void;
    /**
     * Return all offers a player has listed on a desired profile
     * @param sessionID Session id
     * @returns Array of ragfair offers
     */
    protected getProfileOffers(sessionID: string): IRagfairOffer[];
    /**
     * Delete an offer from a desired profile and from ragfair offers
     * @param sessionID Session id of profile to delete offer from
     * @param offerId Id of offer to delete
     */
    protected deleteOfferById(sessionID: string, offerId: string): void;
    /**
     * Complete the selling of players' offer
     * @param sessionID Session id
     * @param offer Sold offer details
     * @param boughtAmount Amount item was purchased for
     * @returns IItemEventRouterResponse
     */
    protected completeOffer(sessionID: string, offer: IRagfairOffer, boughtAmount: number): IItemEventRouterResponse;
    /**
     * Get a localised message for when players offer has sold on flea
     * @param itemTpl Item sold
     * @param boughtAmount How many were purchased
     * @returns Localised message text
     */
    protected getLocalisedOfferSoldMessage(itemTpl: string, boughtAmount: number): string;
    /**
     * Check an offer passes the various search criteria the player requested
     * @param searchRequest
     * @param offer
     * @param pmcData
     * @returns True
     */
    protected passesSearchFilterCriteria(searchRequest: ISearchRequestData, offer: IRagfairOffer, pmcData: IPmcData): boolean;
    /**
     * Check that the passed in offer item is functional
     * @param offerRootItem The root item of the offer
     * @param offer The flea offer
     * @returns True if the given item is functional
     */
    isItemFunctional(offerRootItem: Item, offer: IRagfairOffer): boolean;
    /**
     * Should a ragfair offer be visible to the player
     * @param searchRequest Search request
     * @param itemsToAdd ?
     * @param traderAssorts Trader assort items
     * @param offer The flea offer
     * @param pmcProfile Player profile
     * @returns True = should be shown to player
     */
    isDisplayableOffer(searchRequest: ISearchRequestData, itemsToAdd: string[], traderAssorts: Record<string, ITraderAssort>, offer: IRagfairOffer, pmcProfile: IPmcData): boolean;
    isDisplayableOfferThatNeedsItem(searchRequest: ISearchRequestData, offer: IRagfairOffer): boolean;
    /**
     * Does the passed in item have a condition property
     * @param item Item to check
     * @returns True if has condition
     */
    protected isConditionItem(item: Item): boolean;
    /**
     * Is items quality value within desired range
     * @param item Item to check quality of
     * @param min Desired minimum quality
     * @param max Desired maximum quality
     * @returns True if in range
     */
    protected itemQualityInRange(item: Item, min: number, max: number): boolean;
}
