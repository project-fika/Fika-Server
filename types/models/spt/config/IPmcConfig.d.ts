import { MinMax } from "@spt/models/common/MinMax";
import { IBossLocationSpawn, IChancedEnemy } from "@spt/models/eft/common/ILocationBase";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IPmcConfig extends IBaseConfig {
    kind: "spt-pmc";
    /** What game version should the PMC have */
    gameVersionWeight: Record<string, number>;
    /** What account type should the PMC have */
    accountTypeWeight: Record<MemberCategory, number>;
    /** Global whitelist/blacklist of vest loot for PMCs */
    vestLoot: ISlotLootSettings;
    /** Global whitelist/blacklist of pocket loot for PMCs */
    pocketLoot: ISlotLootSettings;
    /** Global whitelist/blacklist of backpack loot for PMCs */
    backpackLoot: ISlotLootSettings;
    globalLootBlacklist: string[];
    /** Use difficulty defined in config/bot.json/difficulty instead of chosen difficulty dropdown value */
    useDifficultyOverride: boolean;
    /** Difficulty override e.g. "AsOnline/Hard" */
    difficulty: string;
    /** Chance out of 100 to have a complete gun in backpack */
    looseWeaponInBackpackChancePercent: number;
    /** Chance out of 100 to have an enhancement applied to PMC weapon */
    weaponHasEnhancementChancePercent: number;
    /** MinMax count of weapons to have in backpack */
    looseWeaponInBackpackLootMinMax: MinMax;
    /** Percentage chance PMC will be USEC */
    isUsec: number;
    /** WildSpawnType enum value USEC PMCs use */
    usecType: string;
    /** WildSpawnType enum value BEAR PMCs use */
    bearType: string;
    /** What 'brain' does a PMC use, keyed by map and side (USEC/BEAR) key: map location, value: type for usec/bear */
    pmcType: Record<string, Record<string, Record<string, number>>>;
    maxBackpackLootTotalRub: IMinMaxLootValue[];
    lootItemLimitsRub: IMinMaxLootItemValue[];
    maxPocketLootTotalRub: number;
    maxVestLootTotalRub: number;
    /** How many levels above player level can a PMC be */
    botRelativeLevelDeltaMax: number;
    /** How many levels below player level can a PMC be */
    botRelativeLevelDeltaMin: number;
    /** Force a number of healing items into PMCs secure container to ensure they can heal */
    forceHealingItemsIntoSecure: boolean;
    hostilitySettings: Record<string, IHostilitySettings>;
    allPMCsHavePlayerNameWithRandomPrefixChance: number;
    locationSpecificPmcLevelOverride: Record<string, MinMax>;
    /** Should secure container loot from usec.json/bear.json be added to pmc bots secure */
    addSecureContainerLootFromBotConfig: boolean;
    /** key = mapid */
    removeExistingPmcWaves: boolean;
    customPmcWaves: Record<string, IBossLocationSpawn[]>;
}
export interface IHostilitySettings {
    /** Bot roles that are 100% an enemy */
    additionalEnemyTypes?: string[];
    /** Objects that determine the % chance another bot type is an enemy */
    chancedEnemies?: IChancedEnemy[];
    bearEnemyChance?: number;
    usecEnemyChance?: number;
    savageEnemyChance?: number;
    /** Bot roles that are 100% an friendly */
    additionalFriendlyTypes?: string[];
    savagePlayerBehaviour?: string;
}
export interface IPmcTypes {
    usec: string;
    bear: string;
}
export interface ISlotLootSettings {
    /** Item Type whitelist */
    whitelist: string[];
    /** item tpl blacklist */
    blacklist: string[];
}
export interface IMinMaxLootValue extends MinMax {
    value: number;
}
export interface IMinMaxLootItemValue extends MinMax {
    backpack: MinMax;
    pocket: MinMax;
    vest: MinMax;
}
