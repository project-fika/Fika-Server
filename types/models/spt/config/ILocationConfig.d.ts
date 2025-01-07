import { MinMax } from "@spt/models/common/MinMax";
import { IBossLocationSpawn, IWave } from "@spt/models/eft/common/ILocationBase";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ILocationConfig extends IBaseConfig {
    kind: "spt-location";
    /** Rogues are classified as bosses and spawn immediatly, this can result in no scavs spawning, delay rogues spawning to allow scavs to spawn first */
    rogueLighthouseSpawnTimeSettings: IRogueLighthouseSpawnTimeSettings;
    /** When a map has hit max alive bots, any wave that should spawn will be reduced to 1 bot in size and placed in a spawn queue, this splits waves into smaller sizes to reduce the impact of this behaviour */
    splitWaveIntoSingleSpawnsSettings: ISplitWaveSettings;
    looseLootMultiplier: ILootMultiplier;
    staticLootMultiplier: ILootMultiplier;
    /** Custom bot waves to add to a locations base json on game start if addCustomBotWavesToMaps is true */
    customWaves: ICustomWaves;
    /** Open zones to add to map */
    openZones: Record<string, string[]>;
    /** Key = map id, value = item tpls that should only have one forced loot spawn position */
    forcedLootSingleSpawnById: Record<string, string[]>;
    /** How many attempts should be taken to fit an item into a container before giving up */
    fitLootIntoContainerAttempts: number;
    /** Add all possible zones to each maps `OpenZones` property */
    addOpenZonesToAllMaps: boolean;
    /** Allow addition of custom bot waves designed by SPT to be added to maps - defined in  configs/location.json.customWaves */
    addCustomBotWavesToMaps: boolean;
    /** Should the limits defined inside botTypeLimits to appled to locations on game start */
    enableBotTypeLimits: boolean;
    /** Add limits to a locations base.MinMaxBots array if enableBotTypeLimits is true */
    botTypeLimits: Record<string, IBotTypeLimit[]>;
    /** container randomisation settings */
    containerRandomisationSettings: IContainerRandomistionSettings;
    /** How full must a random loose magazine be % */
    minFillLooseMagazinePercent: number;
    /** How full must a random static magazine be % */
    minFillStaticMagazinePercent: number;
    allowDuplicateItemsInStaticContainers: boolean;
    /** Chance loose magazines have ammo in them TODO - rename to dynamicMagazineLootHasAmmoChancePercent */
    magazineLootHasAmmoChancePercent: number;
    /** Chance static magazines have ammo in them */
    staticMagazineLootHasAmmoChancePercent: number;
    /** Key: map, value: loose loot ids to ignore */
    looseLootBlacklist: Record<string, string[]>;
    /** Key: map, value: settings to control how long scav raids are */
    scavRaidTimeSettings: IScavRaidTimeSettings;
    /** Settings to adjust mods for lootable equipment in raid */
    equipmentLootSettings: IEquipmentLootSettings;
    /** min percentage to set raider spawns at, -1 makes no changes */
    reserveRaiderSpawnChanceOverrides: IReserveRaiderSpawnChanceOverrides;
    /** Map ids players cannot visit */
    nonMaps: string[];
}
export interface IReserveRaiderSpawnChanceOverrides {
    nonTriggered: number;
    triggered: number;
}
export interface IEquipmentLootSettings {
    modSpawnChancePercent: Record<string, number>;
}
export interface IFixEmptyBotWavesSettings {
    enabled: boolean;
    ignoreMaps: string[];
}
export interface IRogueLighthouseSpawnTimeSettings {
    enabled: boolean;
    waitTimeSeconds: number;
}
export interface ISplitWaveSettings {
    enabled: boolean;
    ignoreMaps: string[];
    waveSizeThreshold: number;
}
export interface ICustomWaves {
    /** Bosses spawn on raid start */
    boss: Record<string, IBossLocationSpawn[]>;
    normal: Record<string, IWave[]>;
}
export interface IBotTypeLimit extends MinMax {
    type: string;
}
/** Multiplier to apply to the loot count for a given map */
export interface ILootMultiplier {
    bigmap: number;
    develop: number;
    factory4_day: number;
    factory4_night: number;
    interchange: number;
    laboratory: number;
    rezervbase: number;
    shoreline: number;
    woods: number;
    hideout: number;
    lighthouse: number;
    privatearea: number;
    suburbs: number;
    tarkovstreets: number;
    terminal: number;
    town: number;
    sandbox: number;
}
export interface IContainerRandomistionSettings {
    enabled: boolean;
    /** What maps can use the container randomisation feature */
    maps: Record<string, boolean>;
    /** Some container types don't work when randomised */
    containerTypesToNotRandomise: string[];
    containerGroupMinSizeMultiplier: number;
    containerGroupMaxSizeMultiplier: number;
}
export interface IScavRaidTimeSettings {
    settings: IScavRaidTimeConfigSettings;
    maps: Record<string, IScavRaidTimeLocationSettings>;
}
export interface IScavRaidTimeConfigSettings {
    trainArrivalDelayObservedSeconds: number;
}
export interface IScavRaidTimeLocationSettings {
    /** Should loot be reduced by same percent length of raid is reduced by */
    reduceLootByPercent: boolean;
    /** Smallest % of container loot that should be spawned */
    minStaticLootPercent: number;
    /** Smallest % of loose loot that should be spawned */
    minDynamicLootPercent: number;
    /** Chance raid time is reduced */
    reducedChancePercent: number;
    /** How much should raid time be reduced - weighted */
    reductionPercentWeights: Record<string, number>;
    /** Should bot waves be removed / spawn times be adjusted */
    adjustWaves: boolean;
}
