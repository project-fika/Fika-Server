import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
import { ILootRequest } from "@spt/models/spt/services/ILootRequest";
export interface ITraderConfig extends IBaseConfig {
    kind: "spt-trader";
    updateTime: IUpdateTime[];
    updateTimeDefault: number;
    purchasesAreFoundInRaid: boolean;
    /** Should trader reset times be set based on server start time (false = bsg time - on the hour) */
    tradersResetFromServerStart: boolean;
    traderPriceMultipler: number;
    fence: IFenceConfig;
    moddedTraders: IModdedTraders;
}
export interface IUpdateTime {
    traderId: string;
    /** Seconds between trader resets */
    seconds: MinMax;
}
export interface IFenceConfig {
    discountOptions: IDiscountOptions;
    partialRefreshTimeSeconds: number;
    partialRefreshChangePercent: number;
    assortSize: number;
    weaponPresetMinMax: MinMax;
    equipmentPresetMinMax: MinMax;
    itemPriceMult: number;
    presetPriceMult: number;
    armorMaxDurabilityPercentMinMax: IItemDurabilityCurrentMax;
    weaponDurabilityPercentMinMax: IItemDurabilityCurrentMax;
    /** Keyed to plate protection level */
    chancePlateExistsInArmorPercent: Record<string, number>;
    /** Key: item tpl */
    itemStackSizeOverrideMinMax: Record<string, MinMax>;
    itemTypeLimits: Record<string, number>;
    /** Prevent duplicate offers of items of specific categories by parentId */
    preventDuplicateOffersOfCategory: string[];
    regenerateAssortsOnRefresh: boolean;
    /** Max rouble price before item is not listed on flea */
    itemCategoryRoublePriceLimit: Record<string, number>;
    /** Each slotid with % to be removed prior to listing on fence */
    presetSlotsToRemoveChancePercent: Record<string, number>;
    /** Block seasonal items from appearing when season is inactive */
    blacklistSeasonalItems: boolean;
    /** Max pen value allowed to be listed on flea - affects ammo + ammo boxes */
    ammoMaxPenLimit: number;
    blacklist: string[];
    coopExtractGift: ICoopExtractReward;
    btrDeliveryExpireHours: number;
    /** Smallest value player rep with fence can fall to */
    playerRepMin: number;
    /** Highest value player rep with fence can climb to */
    playerRepMax: number;
}
export interface IItemDurabilityCurrentMax {
    current: MinMax;
    max: MinMax;
}
export interface ICoopExtractReward extends ILootRequest {
    sendGift: boolean;
    messageLocaleIds: string[];
    giftExpiryHours: number;
}
export interface IDiscountOptions {
    assortSize: number;
    itemPriceMult: number;
    presetPriceMult: number;
    weaponPresetMinMax: MinMax;
    equipmentPresetMinMax: MinMax;
}
/** Custom trader data needed client side for things such as the clothing service */
export interface IModdedTraders {
    /** Trader Ids to enable the clothing service for */
    clothingService: string[];
}
