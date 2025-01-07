import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IOwnerInventoryItems {
    from: IItem[];
    to: IItem[];
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
    getSecureContainerItems(items: IItem[]): string[];
}
