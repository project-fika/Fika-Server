import { IInventoryBaseActionRequestData, ITo } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryMoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Move";
    item: string;
    to: ITo;
}
