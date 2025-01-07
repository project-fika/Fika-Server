import { IAdditionalHostilitySettings, IBossLocationSpawn, IWave } from "@spt/models/eft/common/ILocationBase";
import { Season } from "@spt/models/enums/Season";
import { SeasonalEventType } from "@spt/models/enums/SeasonalEventType";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ISeasonalEventConfig extends IBaseConfig {
    kind: "spt-seasonalevents";
    enableSeasonalEventDetection: boolean;
    /** event / botType / equipSlot / itemid */
    eventGear: Record<string, Record<string, Record<string, Record<string, number>>>>;
    /** event / bot type / equipSlot / itemid */
    eventLoot: Record<string, Record<string, Record<string, Record<string, number>>>>;
    events: ISeasonalEvent[];
    eventBotMapping: Record<string, string>;
    eventBossSpawns: Record<string, Record<string, IBossLocationSpawn[]>>;
    eventWaves: Record<string, Record<string, IWave[]>>;
    gifterSettings: IGifterSetting[];
    /** key = event, second key = map name */
    hostilitySettingsForEvent: Record<string, Record<string, IAdditionalHostilitySettings[]>>;
    /** Ids of containers on locations that only have christmas loot */
    christmasContainerIds: string[];
    /** Season - botType - location (body/feet/hands/head) */
    botAppearanceChanges: Record<SeasonalEventType, Record<string, Record<string, Record<string, number>>>>;
}
export interface ISeasonalEvent {
    enabled: boolean;
    name: string;
    type: SeasonalEventType;
    startDay: number;
    startMonth: number;
    endDay: number;
    endMonth: number;
    settings?: ISeasonalEventSettings;
}
export interface ISeasonalEventSettings {
    enableSummoning: boolean;
    enableHalloweenHideout: boolean;
    enableChristmasHideout: boolean;
    enableSanta: boolean;
    adjustBotAppearances: boolean;
    addEventGearToBots: boolean;
    addEventLootToBots: boolean;
    removeEntryRequirement: string[];
    replaceBotHostility: boolean;
    forceSeason: Season;
    zombieSettings?: IZombieSettings;
    disableBosses: string[];
    disableWaves: string[];
}
export interface IZombieSettings {
    enabled?: boolean;
    mapInfectionAmount?: Record<string, number>;
    disableBosses?: string[];
    disableWaves?: string[];
}
export interface IGifterSetting {
    map: string;
    zones: string;
    spawnChance: number;
}
