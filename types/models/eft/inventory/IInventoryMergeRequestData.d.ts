import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryMergeRequestData extends IInventoryBaseActionRequestData {
    Action: "Merge";
    item: string;
    with: string;
}
