import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryUnbindRequestData extends IInventoryBaseActionRequestData {
    Action: "Unbind";
    item: string;
    index: number;
}
