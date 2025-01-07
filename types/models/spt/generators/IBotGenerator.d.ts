import { IInventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { IChances, IGeneration, IInventory } from "@spt/models/eft/common/tables/IBotType";
export interface IBotGenerator {
    generateInventory(templateInventory: IInventory, equipmentChances: IChances, generation: IGeneration, botRole: string, isPmc: boolean): PmcInventory;
}
