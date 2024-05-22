import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IItemConfig extends IBaseConfig {
    kind: "spt-item";
    /** Items that should be globally blacklisted */
    blacklist: string[];
    /** items that should not be given as rewards */
    rewardItemBlacklist: string[];
    /** Items that can only be found on bosses */
    bossItems: string[];
    handbookPriceOverride: Record<string, number>;
}
