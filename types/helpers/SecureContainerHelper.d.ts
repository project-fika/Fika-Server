import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
export interface OwnerInventoryItems {
    from: Item[];
    to: Item[];
    sameInventory: boolean;
    isMail: boolean;
}
export declare class SecureContainerHelper {
    protected itemHelper: ItemHelper;
    constructor(itemHelper: ItemHelper);
    /**
     * Get an array of the item IDs (NOT tpls) inside a secure container
     * @param items Inventory items to look for secure container in
     * @returns Array of ids
     */
    getSecureContainerItems(items: Item[]): string[];
}
