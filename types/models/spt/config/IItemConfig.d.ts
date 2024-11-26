import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IItemConfig extends IBaseConfig {
    kind: "spt-item";
    /** Items that should be globally blacklisted */
    blacklist: string[];
    /** Items that should not be lootable from any location */
    lootableItemBlacklist: string[];
    /** items that should not be given as rewards */
    rewardItemBlacklist: string[];
    /** Items that can only be found on bosses */
    bossItems: string[];
    handbookPriceOverride: Record<string, IHandbookPriceOverride>;
}
export interface IHandbookPriceOverride {
    /** Price in roubles */
    price: number;
    /** NOT parentId from items.json, but handbook.json */
    parentId: string;
}
