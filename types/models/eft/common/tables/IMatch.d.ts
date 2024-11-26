export interface IMatch {
    metrics: IMetrics;
}
export interface IMetrics {
    Keys: number[];
    NetProcessingBins: number[];
    RenderBins: number[];
    GameUpdateBins: number[];
    MemoryMeasureInterval: number;
    PauseReasons: number[];
}
