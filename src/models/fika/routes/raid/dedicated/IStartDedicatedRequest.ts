import { BotSettings, TimeAndWeatherSettings, WavesSettings } from "@spt/models/eft/match/IRaidSettings";
import { DateTime } from "@spt/models/enums/DateTime";
import { PlayersSpawnPlace } from "@spt/models/enums/PlayersSpawnPlace";
import { SideType } from "@spt/models/enums/SideType";

export interface IStartDedicatedRequest {
    expectedNumberOfPlayers: number;
    time: DateTime;
    locationId: string;
    spawnPlace: PlayersSpawnPlace;
    metabolismDisabled: boolean;
    timeAndWeatherSettings: TimeAndWeatherSettings;
    botSettings: BotSettings;
    wavesSettings: WavesSettings;
    side: SideType;
    customWeather: boolean;
}
