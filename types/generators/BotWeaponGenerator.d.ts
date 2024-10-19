import { BotEquipmentModGenerator } from "@spt/generators/BotEquipmentModGenerator";
import { IInventoryMagGen } from "@spt/generators/weapongen/IInventoryMagGen";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IInventory as PmcInventory } from "@spt/models/eft/common/tables/IBotBase";
import { IGenerationData, IInventory, IModsChances } from "@spt/models/eft/common/tables/IBotType";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IGenerateWeaponResult } from "@spt/models/spt/bots/IGenerateWeaponResult";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IRepairConfig } from "@spt/models/spt/config/IRepairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotWeaponModLimitService } from "@spt/services/BotWeaponModLimitService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RepairService } from "@spt/services/RepairService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BotWeaponGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    protected botWeaponModLimitService: BotWeaponModLimitService;
    protected botEquipmentModGenerator: BotEquipmentModGenerator;
    protected localisationService: LocalisationService;
    protected repairService: RepairService;
    protected inventoryMagGenComponents: IInventoryMagGen[];
    protected cloner: ICloner;
    protected readonly modMagazineSlotId = "mod_magazine";
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseService: DatabaseService, itemHelper: ItemHelper, weightedRandomHelper: WeightedRandomHelper, botGeneratorHelper: BotGeneratorHelper, randomUtil: RandomUtil, configServer: ConfigServer, botWeaponGeneratorHelper: BotWeaponGeneratorHelper, botWeaponModLimitService: BotWeaponModLimitService, botEquipmentModGenerator: BotEquipmentModGenerator, localisationService: LocalisationService, repairService: RepairService, inventoryMagGenComponents: IInventoryMagGen[], cloner: ICloner);
    /**
     * Pick a random weapon based on weightings and generate a functional weapon
     * @param equipmentSlot Primary/secondary/holster
     * @param botTemplateInventory e.g. assault.json
     * @param weaponParentId
     * @param modChances
     * @param botRole role of bot, e.g. assault/followerBully
     * @param isPmc Is weapon generated for a pmc
     * @returns GenerateWeaponResult object
     */
    generateRandomWeapon(sessionId: string, equipmentSlot: string, botTemplateInventory: IInventory, weaponParentId: string, modChances: IModsChances, botRole: string, isPmc: boolean, botLevel: number): IGenerateWeaponResult;
    /**
     * Get a random weighted weapon from a bots pool of weapons
     * @param equipmentSlot Primary/secondary/holster
     * @param botTemplateInventory e.g. assault.json
     * @returns weapon tpl
     */
    pickWeightedWeaponTplFromPool(equipmentSlot: string, botTemplateInventory: IInventory): string;
    /**
     * Generated a weapon based on the supplied weapon tpl
     * @param weaponTpl Weapon tpl to generate (use pickWeightedWeaponTplFromPool())
     * @param slotName Slot to fit into, primary/secondary/holster
     * @param botTemplateInventory e.g. assault.json
     * @param weaponParentId ParentId of the weapon being generated
     * @param modChances Dictionary of item types and % chance weapon will have that mod
     * @param botRole e.g. assault/exusec
     * @param isPmc Is weapon being generated for a pmc
     * @returns GenerateWeaponResult object
     */
    generateWeaponByTpl(sessionId: string, weaponTpl: string, slotName: string, botTemplateInventory: IInventory, weaponParentId: string, modChances: IModsChances, botRole: string, isPmc: boolean, botLevel: number): IGenerateWeaponResult;
    /**
     * Insert a cartridge(s) into a weapon
     * Handles all chambers - patron_in_weapon, patron_in_weapon_000 etc
     * @param weaponWithModsArray Weapon and mods
     * @param ammoTpl Cartridge to add to weapon
     * @param chamberSlotIds name of slots to create or add ammo to
     */
    protected addCartridgeToChamber(weaponWithModsArray: IItem[], ammoTpl: string, chamberSlotIds: string[]): void;
    /**
     * Create array with weapon base as only element and
     * add additional properties based on weapon type
     * @param weaponTpl Weapon tpl to create item with
     * @param weaponParentId Weapons parent id
     * @param equipmentSlot e.g. primary/secondary/holster
     * @param weaponItemTemplate db template for weapon
     * @param botRole for durability values
     * @returns Base weapon item in array
     */
    protected constructWeaponBaseArray(weaponTpl: string, weaponParentId: string, equipmentSlot: string, weaponItemTemplate: ITemplateItem, botRole: string): IItem[];
    /**
     * Get the mods necessary to kit out a weapon to its preset level
     * @param weaponTpl weapon to find preset for
     * @param equipmentSlot the slot the weapon will be placed in
     * @param weaponParentId Value used for the parentid
     * @returns array of weapon mods
     */
    protected getPresetWeaponMods(weaponTpl: string, equipmentSlot: string, weaponParentId: string, itemTemplate: ITemplateItem, botRole: string): IItem[];
    /**
     * Checks if all required slots are occupied on a weapon and all it's mods
     * @param weaponItemArray Weapon + mods
     * @param botRole role of bot weapon is for
     * @returns true if valid
     */
    protected isWeaponValid(weaponItemArray: IItem[], botRole: string): boolean;
    /**
     * Generates extra magazines or bullets (if magazine is internal) and adds them to TacticalVest and Pockets.
     * Additionally, adds extra bullets to SecuredContainer
     * @param generatedWeaponResult object with properties for generated weapon (weapon mods pool / weapon template / ammo tpl)
     * @param magWeights Magazine weights for count to add to inventory
     * @param inventory Inventory to add magazines to
     * @param botRole The bot type we're getting generating extra mags for
     */
    addExtraMagazinesToInventory(generatedWeaponResult: IGenerateWeaponResult, magWeights: IGenerationData, inventory: PmcInventory, botRole: string): void;
    /**
     * Add Grendaes for UBGL to bots vest and secure container
     * @param weaponMods Weapon array with mods
     * @param generatedWeaponResult result of weapon generation
     * @param inventory bot inventory to add grenades to
     */
    protected addUbglGrenadesToBotInventory(weaponMods: IItem[], generatedWeaponResult: IGenerateWeaponResult, inventory: PmcInventory): void;
    /**
     * Add ammo to the secure container
     * @param stackCount How many stacks of ammo to add
     * @param ammoTpl Ammo type to add
     * @param stackSize Size of the ammo stack to add
     * @param inventory Player inventory
     */
    protected addAmmoToSecureContainer(stackCount: number, ammoTpl: string, stackSize: number, inventory: PmcInventory): void;
    /**
     * Get a weapons magazine tpl from a weapon template
     * @param weaponMods mods from a weapon template
     * @param weaponTemplate Weapon to get magazine tpl for
     * @param botRole the bot type we are getting the magazine for
     * @returns magazine tpl string
     */
    protected getMagazineTplFromWeaponTemplate(weaponMods: IItem[], weaponTemplate: ITemplateItem, botRole: string): string;
    /**
     * Finds and return a compatible ammo tpl based on the bots ammo weightings (x.json/inventory/equipment/ammo)
     * @param cartridgePool Dict of all cartridges keyed by type e.g. Caliber556x45NATO
     * @param weaponTemplate Weapon details from db we want to pick ammo for
     * @returns Ammo tpl that works with the desired gun
     */
    protected getWeightedCompatibleAmmo(cartridgePool: Record<string, Record<string, number>>, weaponTemplate: ITemplateItem): string;
    /**
     * Get the cartridge ids from a weapon template that work with the weapon
     * @param weaponTemplate Weapon db template to get cartridges for
     * @returns Array of cartridge tpls
     */
    protected getCompatibleCartridgesFromWeaponTemplate(weaponTemplate: ITemplateItem): string[];
    /**
     * Get a weapons compatible cartridge caliber
     * @param weaponTemplate Weapon to look up caliber of
     * @returns caliber as string
     */
    protected getWeaponCaliber(weaponTemplate: ITemplateItem): string;
    /**
     * Fill existing magazines to full, while replacing their contents with specified ammo
     * @param weaponMods Weapon with children
     * @param magazine Magazine item
     * @param cartridgeTpl Cartridge to insert into magazine
     */
    protected fillExistingMagazines(weaponMods: IItem[], magazine: IItem, cartridgeTpl: string): void;
    /**
     * Add desired ammo tpl as item to weaponmods array, placed as child to UBGL
     * @param weaponMods Weapon with children
     * @param ubglMod UBGL item
     * @param ubglAmmoTpl Grenade ammo tpl
     */
    protected fillUbgl(weaponMods: IItem[], ubglMod: IItem, ubglAmmoTpl: string): void;
    /**
     * Add cartridge item to weapon Item array, if it already exists, update
     * @param weaponWithMods Weapon items array to amend
     * @param magazine magazine item details we're adding cartridges to
     * @param chosenAmmoTpl cartridge to put into the magazine
     * @param newStackSize how many cartridges should go into the magazine
     * @param magazineTemplate magazines db template
     */
    protected addOrUpdateMagazinesChildWithAmmo(weaponWithMods: IItem[], magazine: IItem, chosenAmmoTpl: string, magazineTemplate: ITemplateItem): void;
    /**
     * Fill each Camora with a bullet
     * @param weaponMods Weapon mods to find and update camora mod(s) from
     * @param magazineId magazine id to find and add to
     * @param ammoTpl ammo template id to hydate with
     */
    protected fillCamorasWithAmmo(weaponMods: IItem[], magazineId: string, ammoTpl: string): void;
}
