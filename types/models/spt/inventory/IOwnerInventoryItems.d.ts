import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IOwnerInventoryItems {
    /** Inventory items from source */
    from: IItem[];
    /** Inventory items at destination */
    to: IItem[];
    sameInventory: boolean;
    isMail: boolean;
}
