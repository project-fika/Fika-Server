import { Item, Location } from "@spt-aki/models/eft/common/tables/IItem";
export interface IAddItemTempObject {
    itemRef: Item;
    count: number;
    isPreset: boolean;
    location?: Location;
    containerId?: string;
}
