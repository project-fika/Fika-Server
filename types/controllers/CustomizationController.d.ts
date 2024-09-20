import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ISuit } from "@spt/models/eft/common/tables/ITrader";
import { IBuyClothingRequestData, IPaymentItemForClothing } from "@spt/models/eft/customization/IBuyClothingRequestData";
import { IWearClothingRequestData } from "@spt/models/eft/customization/IWearClothingRequestData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
export declare class CustomizationController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseService: DatabaseService;
    protected saveServer: SaveServer;
    protected localisationService: LocalisationService;
    protected profileHelper: ProfileHelper;
    protected readonly clothingIds: {
        lowerParentId: string;
        upperParentId: string;
    };
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, databaseService: DatabaseService, saveServer: SaveServer, localisationService: LocalisationService, profileHelper: ProfileHelper);
    /**
     * Get purchasable clothing items from trader that match players side (usec/bear)
     * @param traderID trader to look up clothing for
     * @param sessionID Session id
     * @returns ISuit array
     */
    getTraderSuits(traderID: string, sessionID: string): ISuit[];
    /**
     * Handle CustomizationWear event
     * Equip one to many clothing items to player
     */
    wearClothing(pmcData: IPmcData, wearClothingRequest: IWearClothingRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle CustomizationBuy event
     * Purchase/unlock a clothing item from a trader
     * @param pmcData Player profile
     * @param buyClothingRequest Request object
     * @param sessionId Session id
     * @returns IItemEventRouterResponse
     */
    buyClothing(pmcData: IPmcData, buyClothingRequest: IBuyClothingRequestData, sessionId: string): IItemEventRouterResponse;
    protected getTraderClothingOffer(sessionId: string, offerId: string): ISuit;
    /**
     * Has an outfit been purchased by a player
     * @param suitId clothing id
     * @param sessionID Session id of profile to check for clothing in
     * @returns true if already purchased
     */
    protected outfitAlreadyPurchased(suitId: string, sessionID: string): boolean;
    /**
     * Update output object and player profile with purchase details
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param itemsToPayForClothingWith Clothing purchased
     * @param output Client response
     */
    protected payForClothingItems(sessionId: string, pmcData: IPmcData, itemsToPayForClothingWith: IPaymentItemForClothing[], output: IItemEventRouterResponse): void;
    /**
     * Update output object and player profile with purchase details for single piece of clothing
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param paymentItemDetails Payment details
     * @param output Client response
     */
    protected payForClothingItem(sessionId: string, pmcData: IPmcData, paymentItemDetails: IPaymentItemForClothing, output: IItemEventRouterResponse): void;
    protected getAllTraderSuits(sessionID: string): ISuit[];
}
