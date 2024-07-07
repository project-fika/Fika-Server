import { IInventoryMagGen } from "@spt/generators/weapongen/IInventoryMagGen";
import { InventoryMagGen } from "@spt/generators/weapongen/InventoryMagGen";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BarrelInventoryMagGen implements IInventoryMagGen {
    protected randomUtil: RandomUtil;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    constructor(randomUtil: RandomUtil, botWeaponGeneratorHelper: BotWeaponGeneratorHelper);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
