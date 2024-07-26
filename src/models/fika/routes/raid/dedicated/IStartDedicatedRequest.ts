import { BotSettings, TimeAndWeatherSettings, WavesSettings } from "@spt-aki/models/eft/match/IRaidSettings";
import { DateTime } from "@spt-aki/models/enums/DateTime";
import { PlayersSpawnPlace } from "@spt-aki/models/enums/PlayersSpawnPlace";
import { SideType } from "@spt-aki/models/enums/SideType";

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
}
