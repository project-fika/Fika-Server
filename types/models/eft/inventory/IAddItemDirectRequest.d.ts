import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IAddItemDirectRequest {
    /** Item and child mods to add to player inventory */
    itemWithModsToAdd: IItem[];
    foundInRaid: boolean;
    callback: (buyCount: number) => void;
    useSortingTable: boolean;
}
