import { Ixyz } from "@spt/models/eft/common/Ixyz";
import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface ILooseLoot {
    spawnpointCount: ISpawnpointCount;
    spawnpointsForced: ISpawnpointsForced[];
    spawnpoints: ISpawnpoint[];
}
export interface ISpawnpointCount {
    mean: number;
    std: number;
}
export interface ISpawnpointsForced {
    locationId: string;
    probability: number;
    template: ISpawnpointTemplate;
}
export interface ISpawnpointTemplate {
    Id: string;
    IsContainer: boolean;
    useGravity: boolean;
    randomRotation: boolean;
    Position: Ixyz;
    Rotation: Ixyz;
    IsAlwaysSpawn: boolean;
    IsGroupPosition: boolean;
    GroupPositions: IGroupPostion[];
    Root: string;
    Items: IItem[];
}
export interface IGroupPostion {
    Name: string;
    Weight: number;
    Postion: Ixyz;
    Rotation: Ixyz;
}
export interface ISpawnpoint {
    locationId: string;
    probability: number;
    template: ISpawnpointTemplate;
    itemDistribution: ItemDistribution[];
}
export interface ItemDistribution {
    composedKey: IComposedKey;
    relativeProbability: number;
}
export interface IComposedKey {
    key: string;
}
