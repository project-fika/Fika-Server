import { Ixyz } from "@spt-aki/models/eft/common/Ixyz";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
export interface ILootBase {
    staticAmmo: Record<string, IStaticAmmoDetails[]>;
    staticContainers: Record<string, IStaticContainerDetails>;
    staticLoot: Record<string, IStaticLootDetails>;
}
export interface IStaticAmmoDetails {
    tpl: string;
    relativeProbability: number;
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
export interface IStaticContainerProps extends IStaticPropsBase {
    Items: StaticItem[];
}
export interface StaticItem {
    _id: string;
    _tpl: string;
}
export interface IStaticForcedProps {
    containerId: string;
    itemTpl: string;
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
