import { IInventoryMagGen } from "@spt/generators/weapongen/IInventoryMagGen";
import { InventoryMagGen } from "@spt/generators/weapongen/InventoryMagGen";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
export declare class UbglExternalMagGen implements IInventoryMagGen {
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    constructor(botWeaponGeneratorHelper: BotWeaponGeneratorHelper);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
