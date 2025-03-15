import { Ixyz } from "@spt/models/eft/common/Ixyz";
export interface ICustomizationItem {
    _id: string;
    _name: string;
    _parent: string;
    _type: string;
    _props: IProps;
    _proto: string;
}
export interface IProps {
    Name: string;
    ShortName: string;
    Description: string;
    Game: string[];
    Side: string[];
    BodyPart: string;
    AvailableAsDefault?: boolean;
    Body: string;
    Hands: string;
    Feet: string;
    Prefab: IPrefab;
    ProfileVersions: string[];
    WatchPrefab: IPrefab;
    IntegratedArmorVest: boolean;
    WatchPosition: Ixyz;
    WatchRotation: Ixyz;
}
export interface IPrefab {
    path: string;
    rcid: string;
}
