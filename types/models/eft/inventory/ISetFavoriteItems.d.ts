import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface ISetFavoriteItems extends IInventoryBaseActionRequestData {
    Action: "SetFavoriteItems";
    items: any[];
    timestamp: number;
}
