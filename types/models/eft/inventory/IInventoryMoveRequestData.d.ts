import { IInventoryBaseActionRequestData, To } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryMoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Move";
    item: string;
    to: To;
}
