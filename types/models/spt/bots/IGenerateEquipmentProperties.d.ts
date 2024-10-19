import { IInventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { IChances, IMods } from "@spt/models/eft/common/tables/IBotType";
import { EquipmentFilters, IRandomisationDetails } from "@spt/models/spt/config/IBotConfig";
import { IBotData } from "./IGenerateWeaponRequest";
export interface IGenerateEquipmentProperties {
    /** Root Slot being generated */
    rootEquipmentSlot: string;
    /** Equipment pool for root slot being generated */
    rootEquipmentPool: Record<string, number>;
    modPool: IMods;
    /** Dictionary of mod items and their chance to spawn for this bot type */
    spawnChances: IChances;
    /** Bot-specific properties */
    botData: IBotData;
    inventory: PmcInventory;
    botEquipmentConfig: EquipmentFilters;
    /** Settings from bot.json to adjust how item is generated */
    randomisationDetails: IRandomisationDetails;
    /** OPTIONAL - Do not generate mods for tpls in this array */
    generateModsBlacklist?: string[];
    generatingPlayerLevel: number;
}
