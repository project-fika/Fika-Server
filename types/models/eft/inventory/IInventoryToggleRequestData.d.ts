import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryToggleRequestData extends IInventoryBaseActionRequestData {
    Action: "Toggle";
    item: string;
    value: boolean;
}
