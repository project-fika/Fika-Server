import { Ixyz } from "@spt-aki/models/eft/common/Ixyz";
export interface ICustomizationItem {
    _id: string;
    _name: string;
    _parent: string;
    _type: string;
    _props: Props;
    _proto: string;
}
export interface Props {
    Name: string;
    ShortName: string;
    Description: string;
    Side: string[];
    BodyPart: string;
    AvailableAsDefault?: boolean;
    Body: string;
    Hands: string;
    Feet: string;
    Prefab: Prefab;
    WatchPrefab: Prefab;
    IntegratedArmorVest: boolean;
    WatchPosition: Ixyz;
    WatchRotation: Ixyz;
}
export interface Prefab {
    path: string;
    rcid: string;
}
