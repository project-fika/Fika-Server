export interface IWsMatchGroupRaidSettings {
    type: string;
    eventId: string;
    raidSettings: {
        location: string;
        timeVariant: string;
        raidMode: string;
        metabolismDisabled: boolean;
        playersSpawnPlace: string;
        timeAndWeatherSettings: {
            isRandomTime: boolean;
            isRandomWeather: boolean;
            cloudinessType: string;
            rainType: string;
            fogType: string;
            windType: string;
            timeFlowType: string;
            hourOfDay: number;
        },
        botSettings: {
            isScavWars: boolean;
            botAmount: string;
        },
        wavesSettings: {
            botAmount: string;
            botDifficulty: string;
            isBosses: boolean;
            isTaggedAndCursed: boolean;
        },
        side: string;
    }
}
