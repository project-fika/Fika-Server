import { IContainer, IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryAddRequestData extends IInventoryBaseActionRequestData {
    Action: "Add";
    item: string;
    container: IContainer;
}
