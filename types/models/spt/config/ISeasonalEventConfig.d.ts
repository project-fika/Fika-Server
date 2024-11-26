import { IAdditionalHostilitySettings, IBossLocationSpawn, IWave } from "@spt/models/eft/common/ILocationBase";
import { SeasonalEventType } from "@spt/models/enums/SeasonalEventType";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ISeasonalEventConfig extends IBaseConfig {
    kind: "spt-seasonalevents";
    enableSeasonalEventDetection: boolean;
    /** event / botType / equipSlot / itemid */
    eventGear: Record<string, Record<string, Record<string, Record<string, number>>>>;
    events: ISeasonalEvent[];
    eventBotMapping: Record<string, string>;
    eventBossSpawns: Record<string, Record<string, IBossLocationSpawn[]>>;
    eventWaves: Record<string, Record<string, IWave[]>>;
    gifterSettings: IGifterSetting[];
    /** key = event, second key = map name */
    hostilitySettingsForEvent: Record<string, Record<string, IAdditionalHostilitySettings[]>>;
}
export interface ISeasonalEvent {
    enabled: boolean;
    name: string;
    type: SeasonalEventType;
    startDay: number;
    startMonth: number;
    endDay: number;
    endMonth: number;
    settings?: Record<string, any>;
}
export interface IZombieSettings {
    enabled: boolean;
    mapInfectionAmount: Record<string, number>;
    disableBosses: string[];
    disableWaves: string[];
}
export interface IGifterSetting {
    map: string;
    zones: string;
    spawnChance: number;
}
