import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryTransferRequestData extends IInventoryBaseActionRequestData {
    Action: "Transfer";
    item: string;
    with: string;
    count: number;
}
