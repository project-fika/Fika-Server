import { IInventoryMagGen } from "@spt-aki/generators/weapongen/IInventoryMagGen";
import { InventoryMagGen } from "@spt-aki/generators/weapongen/InventoryMagGen";
import { BotWeaponGeneratorHelper } from "@spt-aki/helpers/BotWeaponGeneratorHelper";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class BarrelInventoryMagGen implements IInventoryMagGen {
    protected randomUtil: RandomUtil;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    constructor(randomUtil: RandomUtil, botWeaponGeneratorHelper: BotWeaponGeneratorHelper);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
