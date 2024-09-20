import { PlayersSpawnPlace } from "@spt/models/enums/PlayersSpawnPlace";
import { TimeFlowType } from "@spt/models/enums/RaidSettings/TimeAndWeather/TimeFlowType";

export interface IFikaRaidSettingsResponse {
    metabolismDisabled: boolean;
    playersSpawnPlace: PlayersSpawnPlace;
    hourOfDay: number;
    timeFlowType: TimeFlowType
}
