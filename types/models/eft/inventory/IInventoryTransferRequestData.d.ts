import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryTransferRequestData extends IInventoryBaseActionRequestData {
    Action: "Transfer";
    item: string;
    with: string;
    count: number;
}
