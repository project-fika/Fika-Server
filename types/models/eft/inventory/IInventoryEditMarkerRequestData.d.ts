import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryEditMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "EditMapMarker";
    item: string;
    X: number;
    Y: number;
    mapMarker: IMapMarker;
}
export interface IMapMarker {
    Type: string;
    X: number;
    Y: number;
    Note: string;
}
