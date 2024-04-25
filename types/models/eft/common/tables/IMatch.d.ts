export interface IMatch {
    metrics: Metrics;
}
export interface Metrics {
    Keys: number[];
    NetProcessingBins: number[];
    RenderBins: number[];
    GameUpdateBins: number[];
    MemoryMeasureInterval: number;
    PauseReasons: number[];
}
