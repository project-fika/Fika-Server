import { Container, IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventorySplitRequestData extends IInventoryBaseActionRequestData {
    Action: "Split";
    /** Id of item to split */
    splitItem: string;
    /** Id of new item stack */
    newItem: string;
    /** Destination new item will be placed in */
    container: Container;
    count: number;
}
