export interface IGetRaidTimeResponse {
    RaidTimeMinutes: number;
    NewSurviveTimeSeconds?: number;
    OriginalSurvivalTimeSeconds: number;
    ExitChanges: ExtractChange[];
}
export interface ExtractChange {
    Name: string;
    MinTime?: number;
    MaxTime?: number;
    Chance?: number;
}
