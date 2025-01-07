import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface ISetFavoriteItems extends IInventoryBaseActionRequestData {
    Action: "SetFavoriteItems";
    items: any[];
    timestamp: number;
}
