import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryEditMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "EditMapMarker";
    item: string;
    X: number;
    Y: number;
    mapMarker: MapMarker;
}
export interface MapMarker {
    Type: string;
    X: number;
    Y: number;
    Note: string;
}
