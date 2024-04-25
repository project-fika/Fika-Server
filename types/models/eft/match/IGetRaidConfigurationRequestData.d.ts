export interface IGetRaidConfigurationRequestData {
    keyId: string;
    side: string;
    location: string;
    timeVariant: string;
    raidMode: string;
    metabolismDisabled: boolean;
    playersSpawnPlace: string;
    timeAndWeatherSettings: TimeAndWeatherSettings;
    botSettings: BotSettings;
    wavesSettings: WavesSettings;
    CanShowGroupPreview: boolean;
    MaxGroupCount: number;
}
export interface TimeAndWeatherSettings {
    isRandomTime: boolean;
    isRandomWeather: boolean;
    cloudinessType: string;
    rainType: string;
    windType: string;
    fogType: string;
    timeFlowType: string;
    hourOfDay: number;
}
export interface BotSettings {
    isScavWars: boolean;
    botAmount: string;
}
export interface WavesSettings {
    botAmount: string;
    botDifficulty: string;
    isBosses: boolean;
    isTaggedAndCursed: boolean;
}
