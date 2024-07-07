export interface IFilterPlateModsForSlotByLevelResult {
    result: Result;
    plateModTpls: string[];
}
export declare enum Result {
    UNKNOWN_FAILURE = -1,
    SUCCESS = 1,
    NO_DEFAULT_FILTER = 2,
    NOT_PLATE_HOLDING_SLOT = 3,
    LACKS_PLATE_WEIGHTS = 4
}
