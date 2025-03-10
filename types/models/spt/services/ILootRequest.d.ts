import { MinMax } from "@spt/models/common/MinMax";
import { AirdropTypeEnum } from "@spt/models/enums/AirdropType";
export interface ILootRequest {
    /** Count of weapons to generate */
    weaponPresetCount: MinMax;
    /** Count of armor to generate */
    armorPresetCount: MinMax;
    /** Count of items to generate */
    itemCount: MinMax;
    /** Count of sealed weapon crates to generate */
    weaponCrateCount: MinMax;
    /** Item tpl blacklist to exclude */
    itemBlacklist: string[];
    /** Item tpl whitelist to pick from */
    itemTypeWhitelist: string[];
    /** key: item base type: value: max count */
    itemLimits: Record<string, number>;
    itemStackLimits: Record<string, MinMax>;
    /** Allowed armor plate levels 2/3/4/5/6 for armor generated */
    armorLevelWhitelist: number[];
    /** Should boss items be included in allowed items */
    allowBossItems: boolean;
    /** Should item.json item reward blacklist be used */
    useRewardItemBlacklist?: boolean;
    /** Should forced loot be used instead of randomised loot */
    useForcedLoot?: boolean;
    /** Item tpls + count of items to force include */
    forcedLoot?: Record<string, MinMax>;
    /** Should seasonal items appear when its not the season for them */
    blockSeasonalItemsOutOfSeason: boolean;
}
export interface IAirdropLootRequest extends ILootRequest {
    /** Airdrop icon used by client to show crate type */
    icon?: AirdropTypeEnum;
}
