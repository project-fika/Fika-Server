import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { BotWeaponGeneratorHelper } from "@spt-aki/helpers/BotWeaponGeneratorHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { ProbabilityHelper } from "@spt-aki/helpers/ProbabilityHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IPreset } from "@spt-aki/models/eft/common/IGlobals";
import { Mods, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem, Slot } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ModSpawn } from "@spt-aki/models/enums/ModSpawn";
import { IChooseRandomCompatibleModResult } from "@spt-aki/models/spt/bots/IChooseRandomCompatibleModResult";
import { EquipmentFilterDetails, EquipmentFilters, IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { BotEquipmentFilterService } from "@spt-aki/services/BotEquipmentFilterService";
import { BotEquipmentModPoolService } from "@spt-aki/services/BotEquipmentModPoolService";
import { BotModLimits, BotWeaponModLimitService } from "@spt-aki/services/BotWeaponModLimitService";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { IGenerateEquipmentProperties } from "./BotInventoryGenerator";
import { IFilterPlateModsForSlotByLevelResult } from "./IFilterPlateModsForSlotByLevelResult";
export declare class BotEquipmentModGenerator {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected probabilityHelper: ProbabilityHelper;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected botEquipmentFilterService: BotEquipmentFilterService;
    protected itemFilterService: ItemFilterService;
    protected profileHelper: ProfileHelper;
    protected botWeaponModLimitService: BotWeaponModLimitService;
    protected botHelper: BotHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected presetHelper: PresetHelper;
    protected localisationService: LocalisationService;
    protected botEquipmentModPoolService: BotEquipmentModPoolService;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, hashUtil: HashUtil, randomUtil: RandomUtil, probabilityHelper: ProbabilityHelper, databaseServer: DatabaseServer, itemHelper: ItemHelper, botEquipmentFilterService: BotEquipmentFilterService, itemFilterService: ItemFilterService, profileHelper: ProfileHelper, botWeaponModLimitService: BotWeaponModLimitService, botHelper: BotHelper, botGeneratorHelper: BotGeneratorHelper, botWeaponGeneratorHelper: BotWeaponGeneratorHelper, weightedRandomHelper: WeightedRandomHelper, presetHelper: PresetHelper, localisationService: LocalisationService, botEquipmentModPoolService: BotEquipmentModPoolService, configServer: ConfigServer);
    /**
     * Check mods are compatible and add to array
     * @param equipment Equipment item to add mods to
     * @param modPool Mod list to choose frm
     * @param parentId parentid of item to add mod to
     * @param parentTemplate template objet of item to add mods to
     * @param forceSpawn should this mod be forced to spawn
     * @returns Item + compatible mods as an array
     */
    generateModsForEquipment(equipment: Item[], parentId: string, parentTemplate: ITemplateItem, settings: IGenerateEquipmentProperties, shouldForceSpawn?: boolean): Item[];
    /**
     * Filter a bots plate pool based on its current level
     * @param settings Bot equipment generation settings
     * @param modSlot Armor slot being filtered
     * @param existingPlateTplPool Plates tpls to choose from
     * @param armorItem
     * @returns Array of plate tpls to choose from
     */
    protected filterPlateModsForSlotByLevel(settings: IGenerateEquipmentProperties, modSlot: string, existingPlateTplPool: string[], armorItem: ITemplateItem): IFilterPlateModsForSlotByLevelResult;
    /**
     * Add mods to a weapon using the provided mod pool
     * @param sessionId session id
     * @param weapon Weapon to add mods to
     * @param modPool Pool of compatible mods to attach to weapon
     * @param weaponId parentId of weapon
     * @param parentTemplate Weapon which mods will be generated on
     * @param modSpawnChances Mod spawn chances
     * @param ammoTpl Ammo tpl to use when generating magazines/cartridges
     * @param botRole Role of bot weapon is generated for
     * @param botLevel Level of the bot weapon is being generated for
     * @param modLimits limits placed on certain mod types per gun
     * @param botEquipmentRole role of bot when accessing bot.json equipment config settings
     * @returns Weapon + mods array
     */
    generateModsForWeapon(sessionId: string, weapon: Item[], modPool: Mods, weaponId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string, botLevel: number, modLimits: BotModLimits, botEquipmentRole: string): Item[];
    /**
     * Is this modslot a front or rear sight
     * @param modSlot Slot to check
     * @returns true if it's a front/rear sight
     */
    protected modIsFrontOrRearSight(modSlot: string, tpl: string): boolean;
    /**
     * Does the provided mod details show the mod can hold a scope
     * @param modSlot e.g. mod_scope, mod_mount
     * @param modsParentId Parent id of mod item
     * @returns true if it can hold a scope
     */
    protected modSlotCanHoldScope(modSlot: string, modsParentId: string): boolean;
    /**
     * Set mod spawn chances to defined amount
     * @param modSpawnChances Chance dictionary to update
     */
    protected adjustSlotSpawnChances(modSpawnChances: ModsChances, modSlotsToAdjust: string[], newChancePercent: number): void;
    protected modSlotCanHoldMuzzleDevices(modSlot: string, modsParentId: string): boolean;
    protected sortModKeys(unsortedKeys: string[]): string[];
    /**
     * Get a Slot property for an item (chamber/cartridge/slot)
     * @param modSlot e.g patron_in_weapon
     * @param parentTemplate item template
     * @returns Slot item
     */
    protected getModItemSlotFromDb(modSlot: string, parentTemplate: ITemplateItem): Slot;
    /**
     * Randomly choose if a mod should be spawned, 100% for required mods OR mod is ammo slot
     * @param itemSlot slot the item sits in
     * @param modSlot slot the mod sits in
     * @param modSpawnChances Chances for various mod spawns
     * @param botEquipConfig Various config settings for generating this type of bot
     * @returns ModSpawn.SPAWN when mod should be spawned, ModSpawn.DEFAULT_MOD when default mod should spawn, ModSpawn.SKIP when mod is skipped
     */
    protected shouldModBeSpawned(itemSlot: Slot, modSlot: string, modSpawnChances: ModsChances, botEquipConfig: EquipmentFilters): ModSpawn;
    /**
     * @param modSlot Slot mod will fit into
     * @param isRandomisableSlot Will generate a randomised mod pool if true
     * @param modsParent Parent slot the item will be a part of
     * @param botEquipBlacklist Blacklist to prevent mods from being picked
     * @param itemModPool Pool of items to pick from
     * @param weapon array with only weapon tpl in it, ready for mods to be added
     * @param ammoTpl ammo tpl to use if slot requires a cartridge to be added (e.g. mod_magazine)
     * @param parentTemplate Parent item the mod will go into
     * @returns itemHelper.getItem() result
     */
    protected chooseModToPutIntoSlot(modSlot: string, isRandomisableSlot: boolean, botWeaponSightWhitelist: Record<string, string[]>, botEquipBlacklist: EquipmentFilterDetails, itemModPool: Record<string, string[]>, weapon: Item[], ammoTpl: string, parentTemplate: ITemplateItem, modSpawnResult: ModSpawn): [boolean, ITemplateItem];
    protected pickWeaponModTplForSlotFromPool(modPool: string[], parentSlot: Slot, modSpawnResult: ModSpawn, weapon: Item[], modSlotname: string): IChooseRandomCompatibleModResult;
    /**
     * Filter mod pool down based on various criteria:
     * Is slot flagged as randomisable
     * Is slot required
     * Is slot flagged as default mod only
     * @param itemModPool Existing pool of mods to choose
     * @param modSpawnResult outcome of random roll to select if mod should be added
     * @param parentTemplate Mods parent
     * @param weaponTemplate Mods root parent (weapon/equipment)
     * @param modSlot name of mod slot to choose for
     * @param botEquipBlacklist
     * @param isRandomisableSlot is flagged as a randomisable slot
     * @returns
     */
    protected getModPoolForSlot(itemModPool: Record<string, string[]>, modSpawnResult: ModSpawn, parentTemplate: ITemplateItem, weaponTemplate: ITemplateItem, modSlot: string, botEquipBlacklist: EquipmentFilterDetails, isRandomisableSlot: boolean): string[];
    /**
     * Get default preset for weapon, get specific weapon presets for edge cases (mp5/silenced dvl)
     * @param weaponTemplate
     * @param parentItemTpl
     * @returns
     */
    protected getMatchingPreset(weaponTemplate: ITemplateItem, parentItemTpl: string): IPreset;
    /**
     * Temp fix to prevent certain combinations of weapons with mods that are known to be incompatible
     * @param weapon Weapon
     * @param modTpl Mod to check compatibility with weapon
     * @returns True if incompatible
     */
    protected weaponModComboIsIncompatible(weapon: Item[], modTpl: string): boolean;
    /**
     * Create a mod item with parameters as properties
     * @param modId _id
     * @param modTpl _tpl
     * @param parentId parentId
     * @param modSlot slotId
     * @param modTemplate Used to add additional properties in the upd object
     * @returns Item object
     */
    protected createModItem(modId: string, modTpl: string, parentId: string, modSlot: string, modTemplate: ITemplateItem, botRole: string): Item;
    /**
     * Get a list of containers that hold ammo
     * e.g. mod_magazine / patron_in_weapon_000
     * @returns string array
     */
    protected getAmmoContainers(): string[];
    /**
     * Get a random mod from an items compatible mods Filter array
     * @param modTpl ???? default value to return if nothing found
     * @param parentSlot item mod will go into, used to get compatible items
     * @param modSlot Slot to get mod to fill
     * @param items items to ensure picked mod is compatible with
     * @returns item tpl
     */
    protected getRandomModTplFromItemDb(modTpl: string, parentSlot: Slot, modSlot: string, items: Item[]): string;
    /**
     * Check if mod exists in db + is for a required slot
     * @param modToAdd Db template of mod to check
     * @param slotAddedToTemplate Slot object the item will be placed as child into
     * @param modSlot Slot the mod will fill
     * @param parentTemplate Db template of the mods being added
     * @param botRole Bots wildspawntype (assault/pmcBot etc)
     * @returns true if valid
     */
    protected isModValidForSlot(modToAdd: [boolean, ITemplateItem], slotAddedToTemplate: Slot, modSlot: string, parentTemplate: ITemplateItem, botRole: string): boolean;
    /**
     * Find mod tpls of a provided type and add to modPool
     * @param desiredSlotName slot to look up and add we are adding tpls for (e.g mod_scope)
     * @param modTemplate db object for modItem we get compatible mods from
     * @param modPool Pool of mods we are adding to
     */
    protected addCompatibleModsForProvidedMod(desiredSlotName: string, modTemplate: ITemplateItem, modPool: Mods, botEquipBlacklist: EquipmentFilterDetails): void;
    /**
     * Get the possible items that fit a slot
     * @param parentItemId item tpl to get compatible items for
     * @param modSlot Slot item should fit in
     * @param botEquipBlacklist equipment that should not be picked
     * @returns array of compatible items for that slot
     */
    protected getDynamicModPool(parentItemId: string, modSlot: string, botEquipBlacklist: EquipmentFilterDetails): string[];
    /**
     * Take a list of tpls and filter out blacklisted values using itemFilterService + botEquipmentBlacklist
     * @param allowedMods base mods to filter
     * @param botEquipBlacklist equipment blacklist
     * @param modSlot slot mods belong to
     * @returns Filtered array of mod tpls
     */
    protected filterWeaponModsByBlacklist(allowedMods: string[], botEquipBlacklist: EquipmentFilterDetails, modSlot: string): string[];
    /**
     * With the shotgun revolver (60db29ce99594040e04c4a27) 12.12 introduced CylinderMagazines.
     * Those magazines (e.g. 60dc519adf4c47305f6d410d) have a "Cartridges" entry with a _max_count=0.
     * Ammo is not put into the magazine directly but assigned to the magazine's slots: The "camora_xxx" slots.
     * This function is a helper called by generateModsForItem for mods with parent type "CylinderMagazine"
     * @param items The items where the CylinderMagazine's camora are appended to
     * @param modPool modPool which should include available cartridges
     * @param parentId The CylinderMagazine's UID
     * @param parentTemplate The CylinderMagazine's template
     */
    protected fillCamora(items: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem): void;
    /**
     * Take a record of camoras and merge the compatible shells into one array
     * @param camorasWithShells camoras we want to merge into one array
     * @returns string array of shells for multiple camora sources
     */
    protected mergeCamoraPoolsTogether(camorasWithShells: Record<string, string[]>): string[];
    /**
     * Filter out non-whitelisted weapon scopes
     * Controlled by bot.json weaponSightWhitelist
     * e.g. filter out rifle scopes from SMGs
     * @param weapon Weapon scopes will be added to
     * @param scopes Full scope pool
     * @param botWeaponSightWhitelist Whitelist of scope types by weapon base type
     * @returns Array of scope tpls that have been filtered to just ones allowed for that weapon type
     */
    protected filterSightsByWeaponType(weapon: Item, scopes: string[], botWeaponSightWhitelist: Record<string, string[]>): string[];
}
