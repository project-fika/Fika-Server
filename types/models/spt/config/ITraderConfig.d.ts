import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
import { LootRequest } from "@spt/models/spt/services/LootRequest";
export interface ITraderConfig extends IBaseConfig {
    kind: "spt-trader";
    updateTime: UpdateTime[];
    purchasesAreFoundInRaid: boolean;
    /** Should trader reset times be set based on server start time (false = bsg time - on the hour) */
    tradersResetFromServerStart: boolean;
    updateTimeDefault: number;
    traderPriceMultipler: number;
    fence: FenceConfig;
}
export interface UpdateTime {
    traderId: string;
    /** Seconds between trader resets */
    seconds: MinMax;
}
export interface FenceConfig {
    discountOptions: DiscountOptions;
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
    coopExtractGift: CoopExtractReward;
    btrDeliveryExpireHours: number;
}
export interface IItemDurabilityCurrentMax {
    current: MinMax;
    max: MinMax;
}
export interface CoopExtractReward extends LootRequest {
    sendGift: boolean;
    messageLocaleIds: string[];
    giftExpiryHours: number;
}
export interface DiscountOptions {
    assortSize: number;
    itemPriceMult: number;
    presetPriceMult: number;
    weaponPresetMinMax: MinMax;
    equipmentPresetMinMax: MinMax;
}
