import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventorySortRequestData extends IInventoryBaseActionRequestData {
    Action: "ApplyInventoryChanges";
    changedItems: IItem[];
}
