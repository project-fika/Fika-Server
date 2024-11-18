import { MinMax } from "@spt/models/common/MinMax";
import { IGenerationData } from "@spt/models/eft/common/tables/IBotType";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
import { IBotDurability } from "@spt/models/spt/config/IBotDurability";
export interface IBotConfig extends IBaseConfig {
    kind: "spt-bot";
    /** How many variants of each bot should be generated on raid start */
    presetBatch: IPresetBatch;
    /** Bot roles that should not have PMC types (pmcBEAR/pmcUSEC) added as enemies to */
    botsToNotAddPMCsAsEnemiesTo: string[];
    /** What bot types should be classified as bosses */
    bosses: string[];
    /** Control weapon/armor durability min/max values for each bot type */
    durability: IBotDurability;
    /** Controls the percentage values of randomization item resources */
    lootItemResourceRandomization: Record<string, IRandomisedResourceDetails>;
    /** Control what bots are added to a bots revenge list key: bottype, value: bottypes to revenge on seeing their death */
    revenge: Record<string, string[]>;
    /** Control how many items are allowed to spawn on a bot
     * key: bottype, value: <key: itemTpl: value: max item count> */
    itemSpawnLimits: Record<string, Record<string, number>>;
    /** Blacklist/whitelist items on a bot */
    equipment: Record<string, EquipmentFilters>;
    /** Show a bots botType value after their name */
    showTypeInNickname: boolean;
    /** What ai brain should a normal scav use per map */
    assaultBrainType: Record<string, Record<string, number>>;
    /** What ai brain should a player scav use per map */
    playerScavBrainType: Record<string, Record<string, number>>;
    /** Max number of bots that can be spawned in a raid at any one time */
    maxBotCap: Record<string, number>;
    /** Chance scav has fake pscav name e.g. Scav name (player name) */
    chanceAssaultScavHasPlayerScavName: number;
    /** How many stacks of secret ammo should a bot have in its bot secure container */
    secureContainerAmmoStackCount: number;
    /** Bot roles in this array will be given a dog tag on generation */
    botRolesWithDogTags: string[];
    /** Settings to control the items that get added into wallets on bots */
    walletLoot: IWalletLootSettings;
    /** Currency weights, Keyed by botrole / currency */
    currencyStackSize: Record<string, Record<string, Record<string, number>>>;
    /** Tpls for low profile gas blocks */
    lowProfileGasBlockTpls: string[];
    /** What bottypes should be excluded from having loot generated on them (backpack/pocket/vest) does not disable food/drink/special/ */
    disableLootOnBotTypes: string[];
    assaultToBossConversion: IAssaultToBossConversion;
    /** Max length a bots name can be */
    botNameLengthLimit: number;
    /** Bot roles that must have a unique name when generated vs other bots in raid */
    botRolesThatMustHaveUniqueName: string[];
}
export interface IAssaultToBossConversion {
    bossConvertEnabled: boolean;
    bossesToConvertToWeights: Record<string, number>;
    bossConvertMinMax: Record<string, MinMax>;
}
/** Number of bots to generate and store in cache on raid start per bot type */
export interface IPresetBatch {
    assault: number;
    bossBully: number;
    bossGluhar: number;
    bossKilla: number;
    bossKojaniy: number;
    bossSanitar: number;
    bossTagilla: number;
    bossKnight: number;
    bossTest: number;
    cursedAssault: number;
    followerBully: number;
    followerGluharAssault: number;
    followerGluharScout: number;
    followerGluharSecurity: number;
    followerGluharSnipe: number;
    followerKojaniy: number;
    followerSanitar: number;
    followerTagilla: number;
    followerBirdEye: number;
    followerBigPipe: number;
    followerTest: number;
    followerBoar: number;
    marksman: number;
    pmcBot: number;
    sectantPriest: number;
    sectantWarrior: number;
    gifter: number;
    test: number;
    exUsec: number;
    arenaFighterEvent: number;
    arenaFighter: number;
    crazyAssaultEvent: number;
    bossBoar: number;
    bossBoarSniper: number;
    pmcUSEC: number;
    pmcBEAR: number;
}
export interface IWalletLootSettings {
    /** Chance wallets have loot in them */
    chancePercent: number;
    itemCount: MinMax;
    stackSizeWeight: Record<string, number>;
    currencyWeight: Record<string, number>;
    /** What wallets will have money in them */
    walletTplPool: string[];
}
export interface EquipmentFilters {
    /** Limits for mod types per weapon .e.g. scopes */
    weaponModLimits: IModLimits;
    /** Whitelist for weapon sight types allowed per gun */
    weaponSightWhitelist: Record<string, string[]>;
    /** Chance face shield is down/active */
    faceShieldIsActiveChancePercent?: number;
    /** Chance gun flashlight is active during the day */
    lightIsActiveDayChancePercent?: number;
    /** Chance gun flashlight is active during the night */
    lightIsActiveNightChancePercent?: number;
    /** Chance gun laser is active during the day */
    laserIsActiveChancePercent?: number;
    /** Chance NODS are down/active during the day */
    nvgIsActiveChanceDayPercent?: number;
    /** Chance NODS are down/active during the night */
    nvgIsActiveChanceNightPercent?: number;
    forceOnlyArmoredRigWhenNoArmor?: boolean;
    /** Should plates be filtered by level */
    filterPlatesByLevel?: boolean;
    /** What additional slot ids should be seen as required when choosing a mod to add to a weapon */
    weaponSlotIdsToMakeRequired?: string[];
    /** Adjust weighting/chances of items on bot by level of bot */
    randomisation: IRandomisationDetails[];
    /** Blacklist equipment by level of bot */
    blacklist: IEquipmentFilterDetails[];
    /** Whitelist equipment by level of bot */
    whitelist: IEquipmentFilterDetails[];
    /** Adjust equipment/ammo */
    weightingAdjustmentsByBotLevel: IWeightingAdjustmentDetails[];
    /** Same as weightingAdjustments but based on player level instead of bot level */
    weightingAdjustmentsByPlayerLevel?: IWeightingAdjustmentDetails[];
    /** Should the stock mod be forced to spawn on bot */
    forceStock?: boolean;
    armorPlateWeighting?: IArmorPlateWeights[];
    forceRigWhenNoVest?: boolean;
}
export interface IModLimits {
    /** How many scopes are allowed on a weapon - hard coded to work with OPTIC_SCOPE, ASSAULT_SCOPE, COLLIMATOR, COMPACT_COLLIMATOR */
    scopeLimit?: number;
    /** How many lasers or lights are allowed on a weapon - hard coded to work with TACTICAL_COMBO, and FLASHLIGHT */
    lightLaserLimit?: number;
}
export interface IRandomisationDetails {
    /** Between what levels do these randomisation setting apply to */
    levelRange: MinMax;
    generation?: Record<string, IGenerationData>;
    /** Mod slots that should be fully randomised -ignores mods from bottype.json and instaed creates a pool using items.json */
    randomisedWeaponModSlots?: string[];
    /** Armor slots that should be randomised e.g. 'Headwear, Armband' */
    randomisedArmorSlots?: string[];
    /** Equipment chances */
    equipment?: Record<string, number>;
    /** Weapon mod chances */
    weaponMods?: Record<string, number>;
    /** Equipment mod chances */
    equipmentMods?: Record<string, number>;
    nighttimeChanges?: INighttimeChanges;
    /** Key = weapon tpl, value = min size of magaizne allowed */
    minimumMagazineSize?: Record<string, number>;
}
export interface INighttimeChanges {
    /** Applies changes to values stored in equipmentMods */
    equipmentModsModifiers: Record<string, number>;
}
export interface IEquipmentFilterDetails {
    /** Between what levels do these equipment filter setting apply to */
    levelRange: MinMax;
    /** Key: mod slot name e.g. mod_magazine, value: item tpls */
    equipment?: Record<string, string[]>;
    /** Key: equipment slot name e.g. FirstPrimaryWeapon, value: item tpls */
    gear?: Record<string, string[]>;
    /** Key: cartridge type e.g. Caliber23x75, value: item tpls */
    cartridge?: Record<string, string[]>;
}
export interface IWeightingAdjustmentDetails {
    /** Between what levels do these weight settings apply to */
    levelRange: MinMax;
    /** Key: ammo type e.g. Caliber556x45NATO, value: item tpl + weight */
    ammo?: IAdjustmentDetails;
    /** Key: equipment slot e.g. TacticalVest, value: item tpl + weight */
    equipment?: IAdjustmentDetails;
    /** Key: clothing slot e.g. feet, value: item tpl + weight */
    clothing?: IAdjustmentDetails;
}
export interface IAdjustmentDetails {
    add: Record<string, Record<string, number>>;
    edit: Record<string, Record<string, number>>;
}
export interface IArmorPlateWeights extends Record<string, any> {
    levelRange: MinMax;
}
export interface IRandomisedResourceDetails {
    food: IRandomisedResourceValues;
    meds: IRandomisedResourceValues;
}
export interface IRandomisedResourceValues {
    /** Minimum percent of item to randomized between min and max resource */
    resourcePercent: number;
    /** Chance for randomization to not occur */
    chanceMaxResourcePercent: number;
}
