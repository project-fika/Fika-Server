import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryRemoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Remove";
    item: string;
}
