import { MinMax } from "@spt/models/common/MinMax";
import { AirdropTypeEnum, SptAirdropTypeEnum } from "@spt/models/enums/AirdropType";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IAirdropConfig extends IBaseConfig {
    kind: "spt-airdrop";
    airdropTypeWeightings: Record<SptAirdropTypeEnum, number>;
    /** What rewards will the loot crate contain, keyed by drop type e.g. mixed/weaponArmor/foodMedical/barter */
    loot: Record<string, IAirdropLoot>;
    customAirdropMapping: Record<string, SptAirdropTypeEnum>;
}
/** Chance map will have an airdrop occur out of 100 - locations not included count as 0% */
export interface IAirdropChancePercent {
    bigmap: number;
    woods: number;
    lighthouse: number;
    shoreline: number;
    interchange: number;
    reserve: number;
    tarkovStreets: number;
    sandbox: number;
}
/** Loot inside crate */
export interface IAirdropLoot {
    icon: AirdropTypeEnum;
    /** Min/max of weapons inside crate */
    weaponPresetCount?: MinMax;
    /** Min/max of armors (head/chest/rig) inside crate */
    armorPresetCount?: MinMax;
    /** Min/max of items inside crate */
    itemCount: MinMax;
    /** Min/max of sealed weapon boxes inside crate */
    weaponCrateCount: MinMax;
    /** Items to never allow - tpls */
    itemBlacklist: string[];
    /** Item type (parentId) to allow inside crate */
    itemTypeWhitelist: string[];
    /** Item type/ item tpls to limit count of inside crate - key: item base type: value: max count */
    itemLimits: Record<string, number>;
    /** Items to limit stack size of key: item tpl value: min/max stack size */
    itemStackLimits: Record<string, MinMax>;
    /** Armor levels to allow inside crate e.g. [4,5,6] */
    armorLevelWhitelist?: number[];
    /** Should boss items be added to airdrop crate */
    allowBossItems: boolean;
    useForcedLoot?: boolean;
    forcedLoot?: Record<string, MinMax>;
    useRewardItemBlacklist?: boolean;
    blockSeasonalItemsOutOfSeason?: boolean;
}
