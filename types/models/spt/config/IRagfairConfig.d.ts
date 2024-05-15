import { MinMax } from "@spt-aki/models/common/MinMax";
import { IBaseConfig, IRunIntervalValues } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IRagfairConfig extends IBaseConfig {
    kind: "aki-ragfair";
    /** How many seconds should pass before expired offers and procesed + player offers checked if sold */
    runIntervalSeconds: number;
    /** Default values used to hydrate `runIntervalSeconds` with */
    runIntervalValues: IRunIntervalValues;
    /** Player listing settings */
    sell: Sell;
    /** Trader ids + should their assorts be listed on flea */
    traders: Record<string, boolean>;
    dynamic: Dynamic;
}
export interface Sell {
    /** Should a fee be deducted from player when liting an item for sale */
    fees: boolean;
    /** Settings to control chances of offer being sold */
    chance: Chance;
    /** Settings to control how long it takes for a player offer to sell */
    time: MinMax;
    /** Seconds from clicking remove to remove offer from market */
    expireSeconds: number;
}
export interface Chance {
    /** Base chance percent to sell an item */
    base: number;
    /** Value to multiply the sell chance by */
    sellMultiplier: number;
    /** Max possible sell chance % for a player listed offer */
    maxSellChancePercent: number;
    /** Min possible sell chance % for a player listed offer */
    minSellChancePercent: number;
}
export interface Dynamic {
    purchasesAreFoundInRaid: boolean;
    /** Use the highest trader price for an offer if its greater than the price in templates/prices.json */
    useTraderPriceForOffersIfHigher: boolean;
    /** Barter offer specific settings */
    barter: IBarterDetails;
    pack: IPackDetails;
    /** Dynamic offer price below handbook adjustment values */
    offerAdjustment: OfferAdjustment;
    /** How many offers should expire before an offer regeneration occurs */
    expiredOfferThreshold: number;
    /** How many offers should be listed */
    offerItemCount: MinMax;
    /** How much should the price of an offer vary by (percent 0.8 = 80%, 1.2 = 120%) */
    priceRanges: IPriceRanges;
    /** Should default presets to listed only or should non-standard presets found in globals.json be listed too */
    showDefaultPresetsOnly: boolean;
    endTimeSeconds: MinMax;
    /** Settings to control the durability range of item items listed on flea */
    condition: Condition;
    /** Size stackable items should be listed for in percent of max stack size */
    stackablePercent: MinMax;
    /** Items that cannot be stacked can have multiples sold in one offer, what range of values can be listed */
    nonStackableCount: MinMax;
    /** Range of rating offers for items being listed */
    rating: MinMax;
    /** Armor specific flea settings */
    armor: IArmorSettings;
    /** A multipler to apply to individual tpls price just prior to item quality adjustment */
    itemPriceMultiplier: Record<string, number>;
    /** Percentages to sell offers in each currency */
    currencies: Record<string, number>;
    /** Item tpls that should be forced to sell as a single item */
    showAsSingleStack: string[];
    /** Should christmas/halloween items be removed from flea when not within the seasonal bounds */
    removeSeasonalItemsWhenNotInEvent: boolean;
    /** Flea blacklist settings */
    blacklist: Blacklist;
    /** Dict of price limits keyed by item type */
    unreasonableModPrices: Record<string, IUnreasonableModPrices>;
}
export interface IPriceRanges {
    default: MinMax;
    preset: MinMax;
    pack: MinMax;
}
export interface IBarterDetails {
    /** Percentage change an offer is listed as a barter */
    chancePercent: number;
    /** Min number of required items for a barter requirement */
    itemCountMin: number;
    /** Max number of required items for a barter requirement */
    itemCountMax: number;
    /** How much can the total price of requested items vary from the item offered */
    priceRangeVariancePercent: number;
    /** Min rouble price for an offer to be considered for turning into a barter */
    minRoubleCostToBecomeBarter: number;
    /** Item Tpls to never be turned into a barter */
    itemTypeBlacklist: string[];
}
export interface IPackDetails {
    /** Percentage change an offer is listed as a pack */
    chancePercent: number;
    /** Min number of required items for a pack */
    itemCountMin: number;
    /** Max number of required items for a pack */
    itemCountMax: number;
    /** item types to allow being a pack */
    itemTypeWhitelist: string[];
}
export interface OfferAdjustment {
    /** Shuld offer price be adjusted when below handbook price */
    adjustPriceWhenBelowHandbookPrice: boolean;
    /** How big a percentage difference does price need to vary from handbook to be considered for adjustment */
    maxPriceDifferenceBelowHandbookPercent: number;
    /** How much to multiply the handbook price to get the new price */
    handbookPriceMultipier: number;
    /** What is the minimum rouble price to consider adjusting price of item */
    priceThreshholdRub: number;
}
export interface Condition {
    /** Percentage change durability is altered */
    conditionChance: number;
    current: MinMax;
    max: MinMax;
}
export interface Blacklist {
    /** Damaged ammo packs */
    damagedAmmoPacks: boolean;
    /** Custom blacklist for item Tpls */
    custom: string[];
    /** BSG blacklist a large number of items from flea, true = use blacklist */
    enableBsgList: boolean;
    /** Should quest items be blacklisted from flea */
    enableQuestList: boolean;
    /** Should trader items that are blacklisted by bsg be listed on flea */
    traderItems: boolean;
    /** Maximum level an armor plate can be found in a flea-listed armor item */
    armorPlate: IArmorPlateBlacklistSettings;
    /** Should specific categories be blacklisted from the flea, true = use blacklist */
    enableCustomItemCategoryList: boolean;
    /** Custom category blacklist for parent Ids */
    customItemCategoryList: string[];
}
export interface IArmorPlateBlacklistSettings {
    /** Max level of plates an armor can have without being removed */
    maxProtectionLevel: number;
    /** Item slots to NOT remove from items on flea */
    ignoreSlots: string[];
}
export interface IUnreasonableModPrices {
    /** Enable a system that adjusts very high ragfair prices to be below a max multiple of items the handbook values */
    enabled: boolean;
    /** Multipler to start adjusting item values from, e.g. a value of 10 means any value over 10x the handbook price gets adjusted  */
    handbookPriceOverMultiplier: number;
    /** The new multiplier for items found using above property, e.g. a value of 4 means set items price to 4x handbook price */
    newPriceHandbookMultiplier: number;
}
export interface IArmorSettings {
    /** % chance / 100 that armor plates will be removed from an offer before listing */
    removeRemovablePlateChance: number;
    /** What slots are to be removed when removeRemovablePlateChance is true */
    plateSlotIdToRemovePool: string[];
}
