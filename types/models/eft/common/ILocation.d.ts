import { Exit, ILocationBase } from "@spt-aki/models/eft/common/ILocationBase";
import { ILooseLoot } from "@spt-aki/models/eft/common/ILooseLoot";
import { Ixyz } from "./Ixyz";
import { Item } from "./tables/IItem";
export interface ILocation {
    /** Map meta-data */
    base: ILocationBase;
    /** Loose loot postions and item weights */
    looseLoot: ILooseLoot;
    /** Static loot item weights */
    staticLoot: Record<string, IStaticLootDetails>;
    /** Static container postions and item weights */
    staticContainers: IStaticContainerDetails;
    staticAmmo: Record<string, IStaticAmmoDetails[]>;
    /** All possible static containers on map + their assign groupings */
    statics: IStaticContainer;
    /** All possible map extracts */
    allExtracts: Exit[];
}
export interface IStaticContainer {
    containersGroups: Record<string, IContainerMinMax>;
    containers: Record<string, IContainerData>;
}
export interface IContainerMinMax {
    minContainers: number;
    maxContainers: number;
    current?: number;
    chosenCount?: number;
}
export interface IContainerData {
    groupId: string;
}
export interface IStaticLootDetails {
    itemcountDistribution: ItemCountDistribution[];
    itemDistribution: ItemDistribution[];
}
export interface ItemCountDistribution {
    count: number;
    relativeProbability: number;
}
export interface ItemDistribution {
    tpl: string;
    relativeProbability: number;
}
export interface IStaticPropsBase {
    Id: string;
    IsContainer: boolean;
    useGravity: boolean;
    randomRotation: boolean;
    Position: Ixyz;
    Rotation: Ixyz;
    IsGroupPosition: boolean;
    IsAlwaysSpawn: boolean;
    GroupPositions: any[];
    Root: string;
    Items: any[];
}
export interface IStaticWeaponProps extends IStaticPropsBase {
    Items: Item[];
}
export interface IStaticContainerDetails {
    staticWeapons: IStaticWeaponProps[];
    staticContainers: IStaticContainerData[];
    staticForced: IStaticForcedProps[];
}
export interface IStaticContainerData {
    probability: number;
    template: IStaticContainerProps;
}
export interface IStaticAmmoDetails {
    tpl: string;
    relativeProbability: number;
}
export interface IStaticForcedProps {
    containerId: string;
    itemTpl: string;
}
export interface IStaticContainerProps extends IStaticPropsBase {
    Items: StaticItem[];
}
export interface StaticItem {
    _id: string;
    _tpl: string;
}
