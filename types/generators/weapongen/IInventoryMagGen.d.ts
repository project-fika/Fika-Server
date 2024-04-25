import { InventoryMagGen } from "@spt-aki/generators/weapongen/InventoryMagGen";
export interface IInventoryMagGen {
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
