import { RagfairAssortGenerator } from "@spt/generators/RagfairAssortGenerator";
import { BotHelper } from "@spt/helpers/BotHelper";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RagfairServerHelper } from "@spt/helpers/RagfairServerHelper";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IBarterScheme } from "@spt/models/eft/common/tables/ITrader";
import { IRagfairOffer, IRagfairOfferUser, OfferRequirement } from "@spt/models/eft/ragfair/IRagfairOffer";
import { Dynamic, IArmorPlateBlacklistSettings, IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RagfairOfferService } from "@spt/services/RagfairOfferService";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class RagfairOfferGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected ragfairServerHelper: RagfairServerHelper;
    protected profileHelper: ProfileHelper;
    protected handbookHelper: HandbookHelper;
    protected botHelper: BotHelper;
    protected saveServer: SaveServer;
    protected presetHelper: PresetHelper;
    protected ragfairAssortGenerator: RagfairAssortGenerator;
    protected ragfairOfferService: RagfairOfferService;
    protected ragfairPriceService: RagfairPriceService;
    protected localisationService: LocalisationService;
    protected paymentHelper: PaymentHelper;
    protected fenceService: FenceService;
    protected itemHelper: ItemHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected ragfairConfig: IRagfairConfig;
    protected allowedFleaPriceItemsForBarter: {
        tpl: string;
        price: number;
    }[];
    /** Internal counter to ensure each offer created has a unique value for its intId property */
    protected offerCounter: number;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, timeUtil: TimeUtil, databaseService: DatabaseService, ragfairServerHelper: RagfairServerHelper, profileHelper: ProfileHelper, handbookHelper: HandbookHelper, botHelper: BotHelper, saveServer: SaveServer, presetHelper: PresetHelper, ragfairAssortGenerator: RagfairAssortGenerator, ragfairOfferService: RagfairOfferService, ragfairPriceService: RagfairPriceService, localisationService: LocalisationService, paymentHelper: PaymentHelper, fenceService: FenceService, itemHelper: ItemHelper, configServer: ConfigServer, cloner: ICloner);
    /**
     * Create a flea offer and store it in the Ragfair server offers array
     * @param userID Owner of the offer
     * @param time Time offer is listed at
     * @param items Items in the offer
     * @param barterScheme Cost of item (currency or barter)
     * @param loyalLevel Loyalty level needed to buy item
     * @param sellInOnePiece Flags sellInOnePiece to be true
     * @returns Created flea offer
     */
    createAndAddFleaOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, sellInOnePiece?: boolean): IRagfairOffer;
    /**
     * Create an offer object ready to send to ragfairOfferService.addOffer()
     * @param userID Owner of the offer
     * @param time Time offer is listed at
     * @param items Items in the offer
     * @param barterScheme Cost of item (currency or barter)
     * @param loyalLevel Loyalty level needed to buy item
     * @param sellInOnePiece Set StackObjectsCount to 1
     * @returns IRagfairOffer
     */
    protected createOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, sellInOnePiece?: boolean): IRagfairOffer;
    /**
     * Create the user object stored inside each flea offer object
     * @param userID user creating the offer
     * @param isTrader Is the user creating the offer a trader
     * @returns IRagfairOfferUser
     */
    createUserDataForFleaOffer(userID: string, isTrader: boolean): IRagfairOfferUser;
    /**
     * Calculate the offer price that's listed on the flea listing
     * @param offerRequirements barter requirements for offer
     * @returns rouble cost of offer
     */
    protected convertOfferRequirementsIntoRoubles(offerRequirements: OfferRequirement[]): number;
    /**
     * Get avatar url from trader table in db
     * @param isTrader Is user we're getting avatar for a trader
     * @param userId persons id to get avatar of
     * @returns url of avatar
     */
    protected getAvatarUrl(isTrader: boolean, userId: string): string;
    /**
     * Convert a count of currency into roubles
     * @param currencyCount amount of currency to convert into roubles
     * @param currencyType Type of currency (euro/dollar/rouble)
     * @returns count of roubles
     */
    protected calculateRoublePrice(currencyCount: number, currencyType: string): number;
    /**
     * Check userId, if its a player, return their pmc _id, otherwise return userId parameter
     * @param userId Users Id to check
     * @returns Users Id
     */
    protected getTraderId(userId: string): string;
    /**
     * Get a flea trading rating for the passed in user
     * @param userId User to get flea rating of
     * @returns Flea rating value
     */
    protected getRating(userId: string): number;
    /**
     * Is the offers user rating growing
     * @param userID user to check rating of
     * @returns true if its growing
     */
    protected getRatingGrowing(userID: string): boolean;
    /**
     * Get number of section until offer should expire
     * @param userID Id of the offer owner
     * @param time Time the offer is posted
     * @returns number of seconds until offer expires
     */
    protected getOfferEndTime(userID: string, time: number): number;
    /**
     * Create multiple offers for items by using a unique list of items we've generated previously
     * @param expiredOffers optional, expired offers to regenerate
     */
    generateDynamicOffers(expiredOffers?: Item[][]): Promise<void>;
    /**
     * @param assortItemWithChildren Item with its children to process into offers
     * @param isExpiredOffer is an expired offer
     * @param config Ragfair dynamic config
     */
    protected createOffersFromAssort(assortItemWithChildren: Item[], isExpiredOffer: boolean, config: Dynamic): Promise<void>;
    /**
     * iterate over an items chidren and look for plates above desired level and remove them
     * @param presetWithChildren preset to check for plates
     * @param plateSettings Settings
     * @returns True if plate removed
     */
    protected removeBannedPlatesFromPreset(presetWithChildren: Item[], plateSettings: IArmorPlateBlacklistSettings): boolean;
    /**
     * Create one flea offer for a specific item
     * @param itemWithChildren Item to create offer for
     * @param isPreset Is item a weapon preset
     * @param itemDetails raw db item details
     * @returns Item array
     */
    protected createSingleOfferForItem(itemWithChildren: Item[], isPreset: boolean, itemDetails: [boolean, ITemplateItem]): Promise<void>;
    /**
     * Generate trader offers on flea using the traders assort data
     * @param traderID Trader to generate offers for
     */
    generateFleaOffersForTrader(traderID: string): void;
    /**
     * Get array of an item with its mods + condition properties (e.g durability)
     * Apply randomisation adjustments to condition if item base is found in ragfair.json/dynamic/condition
     * @param userID id of owner of item
     * @param itemWithMods Item and mods, get condition of first item (only first array item is modified)
     * @param itemDetails db details of first item
     */
    protected randomiseOfferItemUpdProperties(userID: string, itemWithMods: Item[], itemDetails: ITemplateItem): void;
    /**
     * Get the relevant condition id if item tpl matches in ragfair.json/condition
     * @param tpl Item to look for matching condition object
     * @returns condition id
     */
    protected getDynamicConditionIdForTpl(tpl: string): string | undefined;
    /**
     * Alter an items condition based on its item base type
     * @param conditionSettingsId also the parentId of item being altered
     * @param itemWithMods Item to adjust condition details of
     * @param itemDetails db item details of first item in array
     */
    protected randomiseItemCondition(conditionSettingsId: string, itemWithMods: Item[], itemDetails: ITemplateItem): void;
    /**
     * Adjust an items durability/maxDurability value
     * @param item item (weapon/armor) to Adjust
     * @param itemDbDetails Weapon details from db
     * @param maxMultiplier Value to multiply max durability by
     * @param currentMultiplier Value to multiply current durability by
     */
    protected randomiseWeaponDurability(item: Item, itemDbDetails: ITemplateItem, maxMultiplier: number, currentMultiplier: number): void;
    /**
     * Randomise the durabiltiy values for an armors plates and soft inserts
     * @param armorWithMods Armor item with its child mods
     * @param currentMultiplier Chosen multipler to use for current durability value
     * @param maxMultiplier Chosen multipler to use for max durability value
     */
    protected randomiseArmorDurabilityValues(armorWithMods: Item[], currentMultiplier: number, maxMultiplier: number): void;
    /**
     * Add missing conditions to an item if needed
     * Durabiltiy for repairable items
     * HpResource for medical items
     * @param item item to add conditions to
     */
    protected addMissingConditions(item: Item): void;
    /**
     * Create a barter-based barter scheme, if not possible, fall back to making barter scheme currency based
     * @param offerItems Items for sale in offer
     * @returns Barter scheme
     */
    protected createBarterBarterScheme(offerItems: Item[]): IBarterScheme[];
    /**
     * Get an array of flea prices + item tpl, cached in generator class inside `allowedFleaPriceItemsForBarter`
     * @returns array with tpl/price values
     */
    protected getFleaPricesAsArray(): {
        tpl: string;
        price: number;
    }[];
    /**
     * Create a random currency-based barter scheme for an array of items
     * @param offerWithChildren Items on offer
     * @param isPackOffer Is the barter scheme being created for a pack offer
     * @param multipler What to multiply the resulting price by
     * @returns Barter scheme for offer
     */
    protected createCurrencyBarterScheme(offerWithChildren: Item[], isPackOffer: boolean, multipler?: number): IBarterScheme[];
}
