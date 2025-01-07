import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IOpenRandomLootContainerRequestData extends IInventoryBaseActionRequestData {
    Action: "OpenRandomLootContainer";
    /** Container item id being opened */
    item: string;
    to: ITo[];
}
export interface ITo {
    /** Player character (pmc/scav) id items will be sent to */
    id: string;
}
