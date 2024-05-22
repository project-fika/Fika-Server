import { ELocationName } from "@spt/models/enums/ELocationName";
export interface IQuestTypePool {
    types: string[];
    pool: IQuestPool;
}
export interface IQuestPool {
    Exploration: IExplorationPool;
    Elimination: IEliminationPool;
    Pickup: IExplorationPool;
}
export interface IExplorationPool {
    locations: Partial<Record<ELocationName, string[]>>;
}
export interface IEliminationPool {
    targets: IEliminationTargetPool;
}
export interface IEliminationTargetPool {
    Savage?: ITargetLocation;
    AnyPmc?: ITargetLocation;
    bossBully?: ITargetLocation;
    bossGluhar?: ITargetLocation;
    bossKilla?: ITargetLocation;
    bossSanitar?: ITargetLocation;
    bossTagilla?: ITargetLocation;
    bossKnight?: ITargetLocation;
    bossZryachiy?: ITargetLocation;
    bossBoar?: ITargetLocation;
    bossBoarSniper?: ITargetLocation;
}
export interface ITargetLocation {
    locations: string[];
}
