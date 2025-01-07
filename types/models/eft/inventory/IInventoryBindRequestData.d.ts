import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryBindRequestData extends IInventoryBaseActionRequestData {
    Action: "Bind";
    item: string;
    index: number;
}
