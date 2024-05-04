import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { IFenceLevel } from "@spt-aki/models/eft/common/IGlobals";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item, Repairable } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IBarterScheme, ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { IItemDurabilityCurrentMax, ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ICreateFenceAssortsResult } from "@spt-aki/models/spt/fence/ICreateFenceAssortsResult";
import { IFenceAssortGenerationValues, IGenerationAssortValues } from "@spt-aki/models/spt/fence/IFenceAssortGenerationValues";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
/**
 * Handle actions surrounding Fence
 * e.g. generating or refreshing assorts / get next refresh time
 */
export declare class FenceService {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    /** Time when some items in assort will be replaced  */
    protected nextPartialRefreshTimestamp: number;
    /** Main assorts you see at all rep levels */
    protected fenceAssort: ITraderAssort;
    /** Assorts shown on a separate tab when you max out fence rep */
    protected fenceDiscountAssort: ITraderAssort;
    /** Desired baseline counts - Hydrated on initial assort generation as part of generateFenceAssorts() */
    protected desiredAssortCounts: IFenceAssortGenerationValues;
    protected fenceItemUpdCompareProperties: Set<string>;
    constructor(logger: ILogger, jsonUtil: JsonUtil, timeUtil: TimeUtil, randomUtil: RandomUtil, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemHelper: ItemHelper, presetHelper: PresetHelper, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Replace main fence assort with new assort
     * @param assort New assorts to replace old with
     */
    setFenceAssort(assort: ITraderAssort): void;
    /**
     * Replace discount fence assort with new assort
     * @param assort New assorts to replace old with
     */
    setDiscountFenceAssort(assort: ITraderAssort): void;
    /**
     * Get main fence assort
     * @return ITraderAssort
     */
    getMainFenceAssort(): ITraderAssort;
    /**
     * Get discount fence assort
     * @return ITraderAssort
     */
    getDiscountFenceAssort(): ITraderAssort;
    /**
     * Replace high rep level fence assort with new assort
     * @param discountAssort New assorts to replace old with
     */
    setFenceDiscountAssort(discountAssort: ITraderAssort): void;
    /**
     * Get assorts player can purchase
     * Adjust prices based on fence level of player
     * @param pmcProfile Player profile
     * @returns ITraderAssort
     */
    getFenceAssorts(pmcProfile: IPmcData): ITraderAssort;
    /**
     * Adds to fence assort a single item (with its children)
     * @param items the items to add with all its childrens
     * @param mainItem the most parent item of the array
     */
    addItemsToFenceAssort(items: Item[], mainItem: Item): void;
    /**
     * Calculates the overall price for an item (with all its children)
     * @param itemTpl the item tpl to calculate the fence price for
     * @param items the items (with its children) to calculate fence price for
     * @returns the fence price of the item
     */
    getItemPrice(itemTpl: string, items: Item[]): number;
    /**
     * Calculate the overall price for an ammo box, where only one item is
     * the ammo box itself and every other items are the bullets in that box
     * @param items the ammo box (and all its children ammo items)
     * @returns the price of the ammo box
     */
    protected getAmmoBoxPrice(items: Item[]): number;
    /**
     * Adjust all items contained inside an assort by a multiplier
     * @param assort (clone)Assort that contains items with prices to adjust
     * @param itemMultipler multipler to use on items
     * @param presetMultiplier preset multipler to use on presets
     */
    protected adjustAssortItemPricesByConfigMultiplier(assort: ITraderAssort, itemMultipler: number, presetMultiplier: number): void;
    /**
     * Merge two trader assort files together
     * @param firstAssort assort 1#
     * @param secondAssort  assort #2
     * @returns merged assort
     */
    protected mergeAssorts(firstAssort: ITraderAssort, secondAssort: ITraderAssort): ITraderAssort;
    /**
     * Adjust assorts price by a modifier
     * @param item assort item details
     * @param assort assort to be modified
     * @param modifier value to multiply item price by
     * @param presetModifier value to multiply preset price by
     */
    protected adjustItemPriceByModifier(item: Item, assort: ITraderAssort, modifier: number, presetModifier: number): void;
    /**
     * Get fence assorts with no price adjustments based on fence rep
     * @returns ITraderAssort
     */
    getRawFenceAssorts(): ITraderAssort;
    /**
     * Does fence need to perform a partial refresh because its passed the refresh timer defined in trader.json
     * @returns true if it needs a partial refresh
     */
    needsPartialRefresh(): boolean;
    /**
     * Replace a percentage of fence assorts with freshly generated items
     */
    performPartialRefresh(): void;
    /**
     * Handle the process of folding new assorts into existing assorts, when a new assort exists already, increment its StackObjectsCount instead
     * @param newFenceAssorts Assorts to fold into existing fence assorts
     * @param existingFenceAssorts Current fence assorts new assorts will be added to
     */
    protected updateFenceAssorts(newFenceAssorts: ICreateFenceAssortsResult, existingFenceAssorts: ITraderAssort): void;
    /**
     * Increment fence next refresh timestamp by current timestamp + partialRefreshTimeSeconds from config
     */
    protected incrementPartialRefreshTime(): void;
    /**
     * Get values that will hydrate the passed in assorts back to the desired counts
     * @param assortItems Current assorts after items have been removed
     * @param generationValues Base counts assorts should be adjusted to
     * @returns IGenerationAssortValues object with adjustments needed to reach desired state
     */
    protected getItemCountsToGenerate(assortItems: Item[], generationValues: IGenerationAssortValues): IGenerationAssortValues;
    /**
     * Delete desired number of items from assort (including children)
     * @param itemCountToReplace
     * @param discountItemCountToReplace
     */
    protected deleteRandomAssorts(itemCountToReplace: number, assort: ITraderAssort): void;
    /**
     * Choose an item at random and remove it + mods from assorts
     * @param assort Trader assort to remove item from
     * @param rootItems Pool of root items to pick from to remove
     */
    protected removeRandomItemFromAssorts(assort: ITraderAssort, rootItems: Item[]): void;
    /**
     * Get an integer rounded count of items to replace based on percentrage from traderConfig value
     * @param totalItemCount total item count
     * @returns rounded int of items to replace
     */
    protected getCountOfItemsToReplace(totalItemCount: number): number;
    /**
     * Get the count of items fence offers
     * @returns number
     */
    getOfferCount(): number;
    /**
     * Create trader assorts for fence and store in fenceService cache
     * Uses fence base cache generatedon server start as a base
     */
    generateFenceAssorts(): void;
    /**
     * Convert the intermediary assort data generated into format client can process
     * @param intermediaryAssorts Generated assorts that will be converted
     * @returns ITraderAssort
     */
    protected convertIntoFenceAssort(intermediaryAssorts: ICreateFenceAssortsResult): ITraderAssort;
    /**
     * Create object that contains calculated fence assort item values to make based on config
     * Stored in this.desiredAssortCounts
     */
    protected createInitialFenceAssortGenerationValues(): void;
    /**
     * Create skeleton to hold assort items
     * @returns ITraderAssort object
     */
    protected createFenceAssortSkeleton(): ITraderAssort;
    /**
     * Hydrate assorts parameter object with generated assorts
     * @param assortCount Number of assorts to generate
     * @param assorts object to add created assorts to
     */
    protected createAssorts(itemCounts: IGenerationAssortValues, loyaltyLevel: number): ICreateFenceAssortsResult;
    /**
     * Add item assorts to existing assort data
     * @param assortCount Number to add
     * @param assorts Assorts data to add to
     * @param baseFenceAssortClone Base data to draw from
     * @param itemTypeLimits
     * @param loyaltyLevel Loyalty level to set new item to
     */
    protected addItemAssorts(assortCount: number, assorts: ICreateFenceAssortsResult, baseFenceAssortClone: ITraderAssort, itemTypeLimits: Record<string, {
        current: number;
        max: number;
    }>, loyaltyLevel: number): void;
    /**
     * Find an assort item that matches the first parameter, also matches based on upd properties
     * e.g. salewa hp resource units left
     * @param rootItemBeingAdded item to look for a match against
     * @param itemDbDetails Db details of matching item
     * @param itemsWithChildren Items to search through
     * @returns Matching assort item
     */
    protected getMatchingItem(rootItemBeingAdded: Item, itemDbDetails: ITemplateItem, itemsWithChildren: Item[][]): Item;
    /**
     * Should this item be forced into only 1 stack on fence
     * @param existingItem Existing item from fence assort
     * @param itemDbDetails Item we want to add db details
     * @returns True item should be force stacked
     */
    protected itemShouldBeForceStacked(existingItem: Item, itemDbDetails: ITemplateItem): boolean;
    protected itemInPreventDupeCategoryList(tpl: string): boolean;
    /**
     * Adjust price of item based on what is left to buy (resource/uses left)
     * @param barterSchemes All barter scheme for item having price adjusted
     * @param itemRoot Root item having price adjusted
     * @param itemTemplate Db template of item
     */
    protected adjustItemPriceByQuality(barterSchemes: Record<string, IBarterScheme[][]>, itemRoot: Item, itemTemplate: ITemplateItem): void;
    protected getMatchingItemLimit(itemTypeLimits: Record<string, {
        current: number;
        max: number;
    }>, itemTpl: string): {
        current: number;
        max: number;
    };
    /**
     * Find presets in base fence assort and add desired number to 'assorts' parameter
     * @param desiredWeaponPresetsCount
     * @param assorts Assorts to add preset to
     * @param baseFenceAssort Base data to draw from
     * @param loyaltyLevel Which loyalty level is required to see/buy item
     */
    protected addPresetsToAssort(desiredWeaponPresetsCount: number, desiredEquipmentPresetsCount: number, assorts: ICreateFenceAssortsResult, baseFenceAssort: ITraderAssort, loyaltyLevel: number): void;
    /**
     * Adjust plate / soft insert durability values
     * @param armor Armor item array to add mods into
     * @param itemDbDetails Armor items db template
     */
    protected randomiseArmorModDurability(armor: Item[], itemDbDetails: ITemplateItem): void;
    /**
     * Get stack size of a singular item (no mods)
     * @param itemDbDetails item being added to fence
     * @returns Stack size
     */
    protected getSingleItemStackCount(itemDbDetails: ITemplateItem): number;
    /**
     * Remove parts of a weapon prior to being listed on flea
     * @param itemAndMods Weapon to remove parts from
     */
    protected removeRandomModsOfItem(itemAndMods: Item[]): void;
    /**
     * Roll % chance check to see if item should be removed
     * @param weaponMod Weapon mod being checked
     * @param itemsBeingDeleted Current list of items on weapon being deleted
     * @returns True if item will be removed
     */
    protected presetModItemWillBeRemoved(weaponMod: Item, itemsBeingDeleted: string[]): boolean;
    /**
     * Randomise items' upd properties e.g. med packs/weapons/armor
     * @param itemDetails Item being randomised
     * @param itemToAdjust Item being edited
     */
    protected randomiseItemUpdProperties(itemDetails: ITemplateItem, itemToAdjust: Item): void;
    /**
     * Generate a randomised current and max durabiltiy value for an armor item
     * @param itemDetails Item to create values for
     * @param equipmentDurabilityLimits Max durabiltiy percent min/max values
     * @returns Durability + MaxDurability values
     */
    protected getRandomisedArmorDurabilityValues(itemDetails: ITemplateItem, equipmentDurabilityLimits: IItemDurabilityCurrentMax): Repairable;
    /**
     * Construct item limit record to hold max and current item count
     * @param limits limits as defined in config
     * @returns record, key: item tplId, value: current/max item count allowed
     */
    protected initItemLimitCounter(limits: Record<string, number>): Record<string, {
        current: number;
        max: number;
    }>;
    /**
     * Get the next update timestamp for fence
     * @returns future timestamp
     */
    getNextFenceUpdateTimestamp(): number;
    /**
     * Get fence refresh time in seconds
     * @returns Refresh time in seconds
     */
    protected getFenceRefreshTime(): number;
    /**
     * Get fence level the passed in profile has
     * @param pmcData Player profile
     * @returns FenceLevel object
     */
    getFenceInfo(pmcData: IPmcData): IFenceLevel;
    /**
     * Remove or lower stack size of an assort from fence by id
     * @param assortId assort id to adjust
     * @param buyCount Count of items bought
     */
    amendOrRemoveFenceOffer(assortId: string, buyCount: number): void;
    protected deleteOffer(assortId: string, assorts: Item[]): void;
}
