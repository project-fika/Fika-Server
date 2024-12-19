import { IBotSettings, ITimeAndWeatherSettings, IWavesSettings } from "@spt/models/eft/match/IRaidSettings";
import { DateTime } from "@spt/models/enums/DateTime";
import { PlayersSpawnPlace } from "@spt/models/enums/PlayersSpawnPlace";
import { SideType } from "@spt/models/enums/SideType";

export interface IStartDedicatedRequest {
    time: DateTime;
    locationId: string;
    spawnPlace: PlayersSpawnPlace;
    metabolismDisabled: boolean;
    timeAndWeatherSettings: ITimeAndWeatherSettings;
    botSettings: IBotSettings;
    wavesSettings: IWavesSettings;
    side: SideType;
    customWeather: boolean;
}
