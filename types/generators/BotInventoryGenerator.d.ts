import { BotEquipmentModGenerator } from "@spt/generators/BotEquipmentModGenerator";
import { BotLootGenerator } from "@spt/generators/BotLootGenerator";
import { BotWeaponGenerator } from "@spt/generators/BotWeaponGenerator";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { Inventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { Chances, Equipment, Generation, IBotType, Inventory } from "@spt/models/eft/common/tables/IBotType";
import { EquipmentSlots } from "@spt/models/enums/EquipmentSlots";
import { IGenerateEquipmentProperties } from "@spt/models/spt/bots/IGenerateEquipmentProperties";
import { EquipmentFilterDetails, IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotEquipmentModPoolService } from "@spt/services/BotEquipmentModPoolService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotInventoryGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected botWeaponGenerator: BotWeaponGenerator;
    protected botLootGenerator: BotLootGenerator;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected botHelper: BotHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected itemHelper: ItemHelper;
    protected localisationService: LocalisationService;
    protected botEquipmentModPoolService: BotEquipmentModPoolService;
    protected botEquipmentModGenerator: BotEquipmentModGenerator;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, databaseService: DatabaseService, botWeaponGenerator: BotWeaponGenerator, botLootGenerator: BotLootGenerator, botGeneratorHelper: BotGeneratorHelper, botHelper: BotHelper, weightedRandomHelper: WeightedRandomHelper, itemHelper: ItemHelper, localisationService: LocalisationService, botEquipmentModPoolService: BotEquipmentModPoolService, botEquipmentModGenerator: BotEquipmentModGenerator, configServer: ConfigServer);
    /**
     * Add equipment/weapons/loot to bot
     * @param sessionId Session id
     * @param botJsonTemplate Base json db file for the bot having its loot generated
     * @param botRole Role bot has (assault/pmcBot)
     * @param isPmc Is bot being converted into a pmc
     * @param botLevel Level of bot being generated
     * @param chosenGameVersion Game version for bot, only really applies for PMCs
     * @returns PmcInventory object with equipment/weapons/loot
     */
    generateInventory(sessionId: string, botJsonTemplate: IBotType, botRole: string, isPmc: boolean, botLevel: number, chosenGameVersion: string): PmcInventory;
    /**
     * Create a pmcInventory object with all the base/generic items needed
     * @returns PmcInventory object
     */
    protected generateInventoryBase(): PmcInventory;
    /**
     * Add equipment to a bot
     * @param templateInventory bot/x.json data from db
     * @param wornItemChances Chances items will be added to bot
     * @param botRole Role bot has (assault/pmcBot)
     * @param botInventory Inventory to add equipment to
     * @param botLevel Level of bot
     * @param chosenGameVersion Game version for bot, only really applies for PMCs
     */
    protected generateAndAddEquipmentToBot(templateInventory: Inventory, wornItemChances: Chances, botRole: string, botInventory: PmcInventory, botLevel: number, chosenGameVersion: string): void;
    /**
     * Remove non-armored rigs from parameter data
     * @param templateEquipment Equpiment to filter TacticalVest of
     */
    protected filterRigsToThoseWithProtection(templateEquipment: Equipment): void;
    /**
     * Remove armored rigs from parameter data
     * @param templateEquipment Equpiment to filter TacticalVest of
     */
    protected filterRigsToThoseWithoutProtection(templateEquipment: Equipment): void;
    /**
     * Add a piece of equipment with mods to inventory from the provided pools
     * @param settings Values to adjust how item is chosen and added to bot
     * @returns true when item added
     */
    protected generateEquipment(settings: IGenerateEquipmentProperties): boolean;
    /**
     * Get all possible mods for item and filter down based on equipment blacklist from bot.json config
     * @param itemTpl Item mod pool is being retrieved and filtered
     * @param equipmentBlacklist blacklist to filter mod pool with
     * @returns Filtered pool of mods
     */
    protected getFilteredDynamicModsForItem(itemTpl: string, equipmentBlacklist: EquipmentFilterDetails[]): Record<string, string[]>;
    /**
     * Work out what weapons bot should have equipped and add them to bot inventory
     * @param templateInventory bot/x.json data from db
     * @param equipmentChances Chances bot can have equipment equipped
     * @param sessionId Session id
     * @param botInventory Inventory to add weapons to
     * @param botRole assault/pmcBot/bossTagilla etc
     * @param isPmc Is the bot being generated as a pmc
     * @param itemGenerationLimitsMinMax Limits for items the bot can have
     * @param botLevel level of bot having weapon generated
     */
    protected generateAndAddWeaponsToBot(templateInventory: Inventory, equipmentChances: Chances, sessionId: string, botInventory: PmcInventory, botRole: string, isPmc: boolean, itemGenerationLimitsMinMax: Generation, botLevel: number): void;
    /**
     * Calculate if the bot should have weapons in Primary/Secondary/Holster slots
     * @param equipmentChances Chances bot has certain equipment
     * @returns What slots bot should have weapons generated for
     */
    protected getDesiredWeaponsForBot(equipmentChances: Chances): {
        slot: EquipmentSlots;
        shouldSpawn: boolean;
    }[];
    /**
     * Add weapon + spare mags/ammo to bots inventory
     * @param sessionId Session id
     * @param weaponSlot Weapon slot being generated
     * @param templateInventory bot/x.json data from db
     * @param botInventory Inventory to add weapon+mags/ammo to
     * @param equipmentChances Chances bot can have equipment equipped
     * @param botRole assault/pmcBot/bossTagilla etc
     * @param isPmc Is the bot being generated as a pmc
     * @param itemGenerationWeights
     */
    protected addWeaponAndMagazinesToInventory(sessionId: string, weaponSlot: {
        slot: EquipmentSlots;
        shouldSpawn: boolean;
    }, templateInventory: Inventory, botInventory: PmcInventory, equipmentChances: Chances, botRole: string, isPmc: boolean, itemGenerationWeights: Generation, botLevel: number): void;
}
