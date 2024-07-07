import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryCreateMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "CreateMapMarker";
    item: string;
    mapMarker: MapMarker;
}
export interface MapMarker {
    Type: string;
    X: number;
    Y: number;
    Note: string;
}
