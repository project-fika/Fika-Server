import { Item } from "@spt/models/eft/common/tables/IItem";
export interface IOwnerInventoryItems {
    /** Inventory items from source */
    from: Item[];
    /** Inventory items at destination */
    to: Item[];
    sameInventory: boolean;
    isMail: boolean;
}
