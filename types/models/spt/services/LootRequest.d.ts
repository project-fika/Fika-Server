import { MinMax } from "@spt-aki/models/common/MinMax";
export interface LootRequest {
    weaponPresetCount: MinMax;
    armorPresetCount: MinMax;
    itemCount: MinMax;
    weaponCrateCount: MinMax;
    itemBlacklist: string[];
    itemTypeWhitelist: string[];
    /** key: item base type: value: max count */
    itemLimits: Record<string, number>;
    itemStackLimits: Record<string, MinMax>;
    armorLevelWhitelist: number[];
    allowBossItems: boolean;
}
