import { OnLoad } from "@spt/di/OnLoad";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { MinMax } from "@spt/models/common/MinMax";
import { IPreset } from "@spt/models/eft/common/IGlobals";
import { HandbookItem } from "@spt/models/eft/common/tables/IHandbookBase";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IBarterScheme } from "@spt/models/eft/common/tables/ITrader";
import { IRagfairConfig, IUnreasonableModPrices } from "@spt/models/spt/config/IRagfairConfig";
import { IRagfairServerPrices } from "@spt/models/spt/ragfair/IRagfairServerPrices";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
/**
 * Stores flea prices for items as well as methods to interact with them
 */
export declare class RagfairPriceService implements OnLoad {
    protected handbookHelper: HandbookHelper;
    protected databaseService: DatabaseService;
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected traderHelper: TraderHelper;
    protected randomUtil: RandomUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    protected prices: IRagfairServerPrices;
    constructor(handbookHelper: HandbookHelper, databaseService: DatabaseService, logger: ILogger, itemHelper: ItemHelper, presetHelper: PresetHelper, traderHelper: TraderHelper, randomUtil: RandomUtil, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Generate static (handbook) and dynamic (prices.json) flea prices, store inside class as dictionaries
     */
    onLoad(): Promise<void>;
    getRoute(): string;
    /**
     * Iterate over all items of type "Item" in db and get template price, store in cache
     */
    refreshStaticPrices(): void;
    /**
     * Copy the prices.json data into our dynamic price dictionary
     */
    refreshDynamicPrices(): void;
    /**
     * Get the dynamic price for an item. If value doesn't exist, use static (handbook) value.
     * if no static value, return 1
     * @param tplId Item tpl id to get price for
     * @returns price in roubles
     */
    getFleaPriceForItem(tplId: string): number;
    /**
     * Get the flea price for an offers items + children
     * @param offerItems offer item + children to process
     * @returns Rouble price
     */
    getFleaPriceForOfferItems(offerItems: Item[]): number;
    /**
     * get the dynamic (flea) price for an item
     * @param itemTpl item template id to look up
     * @returns price in roubles
     */
    getDynamicPriceForItem(itemTpl: string): number;
    /**
     * Grab the static (handbook) for an item by its tplId
     * @param itemTpl item template id to look up
     * @returns price in roubles
     */
    getStaticPriceForItem(itemTpl: string): number;
    /**
     * Get prices for all items on flea, prioritize handbook prices first, use prices from prices.json if missing
     * This will refresh the caches prior to building the output
     * @returns Dictionary of item tpls and rouble cost
     */
    getAllFleaPrices(): Record<string, number>;
    getAllStaticPrices(): Record<string, number>;
    /**
     * Get the percentage difference between two values
     * @param a numerical value a
     * @param b numerical value b
     * @returns different in percent
     */
    protected getPriceDifference(a: number, b: number): number;
    /**
     * Get the rouble price for an assorts barter scheme
     * @param barterScheme
     * @returns Rouble price
     */
    getBarterPrice(barterScheme: IBarterScheme[]): number;
    /**
     * Generate a currency cost for an item and its mods
     * @param offerItems Item with mods to get price for
     * @param desiredCurrency Currency price desired in
     * @param isPackOffer Price is for a pack type offer
     * @returns cost of item in desired currency
     */
    getDynamicOfferPriceForOffer(offerItems: Item[], desiredCurrency: string, isPackOffer: boolean): number;
    /**
     * @param itemTemplateId items tpl value
     * @param desiredCurrency Currency to return result in
     * @param item Item object (used for weapon presets)
     * @param offerItems
     * @param isPackOffer
     * @returns
     */
    getDynamicItemPrice(itemTemplateId: string, desiredCurrency: string, item?: Item, offerItems?: Item[], isPackOffer?: boolean): number;
    /**
     * using data from config, adjust an items price to be relative to its handbook price
     * @param handbookPrices Prices of items in handbook
     * @param unreasonableItemChange Change object from config
     * @param itemTpl Item being adjusted
     * @param price Current price of item
     * @returns Adjusted price of item
     */
    protected adjustUnreasonablePrice(handbookPrices: HandbookItem[], unreasonableItemChange: IUnreasonableModPrices, itemTpl: string, price: number): number;
    /**
     * Get different min/max price multipliers for different offer types (preset/pack/default)
     * @param isPreset Offer is a preset
     * @param isPack Offer is a pack
     * @returns MinMax values
     */
    protected getOfferTypeRangeValues(isPreset: boolean, isPack: boolean): MinMax;
    /**
     * Check to see if an items price is below its handbook price and adjust according to values set to config/ragfair.json
     * @param itemPrice price of item
     * @param itemTpl item template Id being checked
     * @returns adjusted price value in roubles
     */
    protected adjustPriceIfBelowHandbook(itemPrice: number, itemTpl: string): number;
    /**
     * Multiply the price by a randomised curve where n = 2, shift = 2
     * @param existingPrice price to alter
     * @param rangeValues min and max to adjust price by
     * @returns multiplied price
     */
    protected randomiseOfferPrice(existingPrice: number, rangeValues: MinMax): number;
    /**
     * Calculate the cost of a weapon preset by adding together the price of its mods + base price of default weapon preset
     * @param weaponRootItem base weapon
     * @param weaponWithChildren weapon plus mods
     * @param existingPrice price of existing base weapon
     * @returns price of weapon in roubles
     */
    protected getWeaponPresetPrice(weaponRootItem: Item, weaponWithChildren: Item[], existingPrice: number): number;
    /**
     * Get the highest price for an item that is stored in handbook or trader assorts
     * @param itemTpl Item to get highest price of
     * @returns rouble cost
     */
    protected getHighestHandbookOrTraderPriceAsRouble(itemTpl: string): number;
    /**
     * Attempt to get the default preset for a weapon, failing that get the first preset in the array
     * (assumes default = has encyclopedia entry)
     * @param presets weapon presets to choose from
     * @returns Default preset object
     */
    protected getWeaponPreset(weapon: Item): {
        isDefault: boolean;
        preset: IPreset;
    };
}
