import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import { type ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import type { ISuit } from "@spt/models/eft/common/tables/ITrader";
import type { IBuyClothingRequestData, IPaymentItemForClothing } from "@spt/models/eft/customization/IBuyClothingRequestData";
import type { CustomizationSetOption, ICustomizationSetRequest } from "@spt/models/eft/customization/ICustomizationSetRequest";
import type { IHideoutCustomisation } from "@spt/models/eft/hideout/IHideoutCustomisation";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { PaymentService } from "@spt/services/PaymentService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class CustomizationController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseService: DatabaseService;
    protected saveServer: SaveServer;
    protected localisationService: LocalisationService;
    protected profileHelper: ProfileHelper;
    protected paymentService: PaymentService;
    protected cloner: ICloner;
    protected readonly clothingIds: {
        lowerParentId: string;
        upperParentId: string;
    };
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, databaseService: DatabaseService, saveServer: SaveServer, localisationService: LocalisationService, profileHelper: ProfileHelper, paymentService: PaymentService, cloner: ICloner);
    /**
     * Get purchasable clothing items from trader that match players side (usec/bear)
     * @param traderID trader to look up clothing for
     * @param sessionID Session id
     * @returns ISuit array
     */
    getTraderSuits(traderID: string, sessionID: string): ISuit[];
    /**
     * Handle CustomizationBuy event
     * Purchase/unlock a clothing item from a trader
     * @param pmcData Player profile
     * @param buyClothingRequest Request object
     * @param sessionId Session id
     * @returns IItemEventRouterResponse
     */
    buyCustomisation(pmcData: IPmcData, buyClothingRequest: IBuyClothingRequestData, sessionId: string): IItemEventRouterResponse;
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
    protected getAllTraderSuits(sessionID: string): ISuit[];
    /** Handle client/hideout/customization/offer/list */
    getHideoutCustomisation(sessionID: string, info: IEmptyRequestData): IHideoutCustomisation;
    /** Handle client/customization/storage */
    getCustomisationStorage(sessionID: string, info: IEmptyRequestData): ICustomisationStorage[];
    /** Handle CustomizationSet event */
    setCustomisation(sessionId: string, request: ICustomizationSetRequest, pmcData: IPmcData): IItemEventRouterResponse;
    /**
     * Applies a purchsed suit to the players doll
     * @param customisation Suit to apply to profile
     * @param pmcData Profile to update
     */
    protected applyClothingItemToProfile(customisation: CustomizationSetOption, pmcData: IPmcData): void;
}
