import { Container, IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryAddRequestData extends IInventoryBaseActionRequestData {
    Action: "Add";
    item: string;
    container: Container;
}
