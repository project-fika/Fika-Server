import { Item } from "@spt-aki/models/eft/common/tables/IItem";
export interface IPresetBuildActionRequestData {
    Action: string;
    Id: string;
    /** name of preset given by player */
    Name: string;
    Root: string;
    Items: Item[];
}
