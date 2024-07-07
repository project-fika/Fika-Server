import { Inventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { Chances, Mods } from "@spt/models/eft/common/tables/IBotType";
import { EquipmentFilters, RandomisationDetails } from "@spt/models/spt/config/IBotConfig";
export interface IGenerateEquipmentProperties {
    /** Root Slot being generated */
    rootEquipmentSlot: string;
    /** Equipment pool for root slot being generated */
    rootEquipmentPool: Record<string, number>;
    modPool: Mods;
    /** Dictionary of mod items and their chance to spawn for this bot type */
    spawnChances: Chances;
    /** Role being generated for */
    botRole: string;
    /** Level of bot being generated */
    botLevel: number;
    inventory: PmcInventory;
    botEquipmentConfig: EquipmentFilters;
    /** Settings from bot.json to adjust how item is generated */
    randomisationDetails: RandomisationDetails;
    /** OPTIONAL - Do not generate mods for tpls in this array */
    generateModsBlacklist?: string[];
}
