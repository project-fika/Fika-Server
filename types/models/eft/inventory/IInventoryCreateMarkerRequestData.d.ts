import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryCreateMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "CreateMapMarker";
    item: string;
    mapMarker: IMapMarker;
}
export interface IMapMarker {
    Type: string;
    X: number;
    Y: number;
    Note: string;
}
