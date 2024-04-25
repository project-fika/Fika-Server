import { IInventoryBaseActionRequestData, To } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryMoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Move";
    item: string;
    to: To;
}
