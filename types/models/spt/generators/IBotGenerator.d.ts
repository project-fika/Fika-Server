import { Inventory as PmcInventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { Chances, Generation, Inventory } from "@spt-aki/models/eft/common/tables/IBotType";
export interface IBotGenerator {
    generateInventory(templateInventory: Inventory, equipmentChances: Chances, generation: Generation, botRole: string, isPmc: boolean): PmcInventory;
}
