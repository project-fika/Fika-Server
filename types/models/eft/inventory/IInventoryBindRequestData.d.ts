import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryBindRequestData extends IInventoryBaseActionRequestData {
    Action: "Bind";
    item: string;
    index: number;
}
