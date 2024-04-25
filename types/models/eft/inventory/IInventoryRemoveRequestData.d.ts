import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryRemoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Remove";
    item: string;
}
