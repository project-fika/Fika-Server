import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryUnbindRequestData extends IInventoryBaseActionRequestData {
    Action: "Unbind";
    item: string;
    index: number;
}
