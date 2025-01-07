import { IItem, IItemLocation } from "@spt/models/eft/common/tables/IItem";
export interface IAddItemTempObject {
    itemRef: IItem;
    count: number;
    isPreset: boolean;
    location?: IItemLocation;
    containerId?: string;
}
