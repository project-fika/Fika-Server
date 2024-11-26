import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProbabilityHelper } from "@spt/helpers/ProbabilityHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IPreset } from "@spt/models/eft/common/IGlobals";
import { IMods, IModsChances } from "@spt/models/eft/common/tables/IBotType";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ISlot, ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ModSpawn } from "@spt/models/enums/ModSpawn";
import { IChooseRandomCompatibleModResult } from "@spt/models/spt/bots/IChooseRandomCompatibleModResult";
import { IFilterPlateModsForSlotByLevelResult } from "@spt/models/spt/bots/IFilterPlateModsForSlotByLevelResult";
import { IGenerateEquipmentProperties } from "@spt/models/spt/bots/IGenerateEquipmentProperties";
import { IGenerateWeaponRequest } from "@spt/models/spt/bots/IGenerateWeaponRequest";
import { IModToSpawnRequest } from "@spt/models/spt/bots/IModToSpawnRequest";
import { EquipmentFilters, IBotConfig, IEquipmentFilterDetails } from "@spt/models/spt/config/IBotConfig";
import { ExhaustableArray } from "@spt/models/spt/server/ExhaustableArray";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotEquipmentFilterService } from "@spt/services/BotEquipmentFilterService";
import { BotEquipmentModPoolService } from "@spt/services/BotEquipmentModPoolService";
import { BotWeaponModLimitService } from "@spt/services/BotWeaponModLimitService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BotEquipmentModGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected probabilityHelper: ProbabilityHelper;
    protected databaseService: DatabaseService;
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
    protected cloner: ICloner;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, probabilityHelper: ProbabilityHelper, databaseService: DatabaseService, itemHelper: ItemHelper, botEquipmentFilterService: BotEquipmentFilterService, itemFilterService: ItemFilterService, profileHelper: ProfileHelper, botWeaponModLimitService: BotWeaponModLimitService, botHelper: BotHelper, botGeneratorHelper: BotGeneratorHelper, botWeaponGeneratorHelper: BotWeaponGeneratorHelper, weightedRandomHelper: WeightedRandomHelper, presetHelper: PresetHelper, localisationService: LocalisationService, botEquipmentModPoolService: BotEquipmentModPoolService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Check mods are compatible and add to array
     * @param equipment Equipment item to add mods to
     * @param modPool Mod list to choose frm
     * @param parentId parentid of item to add mod to
     * @param parentTemplate Template object of item to add mods to
     * @param specificBlacklist The relevant blacklist from bot.json equipment dictionary
     * @param forceSpawn should this mod be forced to spawn
     * @returns Item + compatible mods as an array
     */
    generateModsForEquipment(equipment: IItem[], parentId: string, parentTemplate: ITemplateItem, settings: IGenerateEquipmentProperties, specificBlacklist: IEquipmentFilterDetails, shouldForceSpawn?: boolean): IItem[];
    /**
     * Filter a bots plate pool based on its current level
     * @param settings Bot equipment generation settings
     * @param modSlot Armor slot being filtered
     * @param existingPlateTplPool Plates tpls to choose from
     * @param armorItem The armor items db template
     * @returns Array of plate tpls to choose from
     */
    protected filterPlateModsForSlotByLevel(settings: IGenerateEquipmentProperties, modSlot: string, existingPlateTplPool: string[], armorItem: ITemplateItem): IFilterPlateModsForSlotByLevelResult;
    /**
     * Add mods to a weapon using the provided mod pool
     * @param sessionId Session id
     * @param request Data used to generate the weapon
     * @returns Weapon + mods array
     */
    generateModsForWeapon(sessionId: string, request: IGenerateWeaponRequest): IItem[];
    /**
     * Should the provided bot have its stock chance values altered to 100%
     * @param modSlot Slot to check
     * @param botEquipConfig Bots equipment config/chance values
     * @param modToAddTemplate Mod being added to bots weapon
     * @returns True if it should
     */
    protected shouldForceSubStockSlots(modSlot: string, botEquipConfig: EquipmentFilters, modToAddTemplate: ITemplateItem): boolean;
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
    protected adjustSlotSpawnChances(modSpawnChances: IModsChances, modSlotsToAdjust: string[], newChancePercent: number): void;
    /**
     * Does the provided modSlot allow muzzle-related items
     * @param modSlot Slot id to check
     * @param modsParentId OPTIONAL: parent id of modslot being checked
     * @returns True if modSlot can have muzzle-related items
     */
    protected modSlotCanHoldMuzzleDevices(modSlot: string, modsParentId?: string): boolean;
    /**
     * Sort mod slots into an ordering that maximises chance of a successful weapon generation
     * @param unsortedSlotKeys Array of mod slot strings to sort
     * @returns Sorted array
     */
    protected sortModKeys(unsortedSlotKeys: string[]): string[];
    /**
     * Get a Slot property for an item (chamber/cartridge/slot)
     * @param modSlot e.g patron_in_weapon
     * @param parentTemplate item template
     * @returns Slot item
     */
    protected getModItemSlotFromDb(modSlot: string, parentTemplate: ITemplateItem): ISlot;
    /**
     * Randomly choose if a mod should be spawned, 100% for required mods OR mod is ammo slot
     * @param itemSlot slot the item sits in from db
     * @param modSlotName Name of slot the mod sits in
     * @param modSpawnChances Chances for various mod spawns
     * @param botEquipConfig Various config settings for generating this type of bot
     * @returns ModSpawn.SPAWN when mod should be spawned, ModSpawn.DEFAULT_MOD when default mod should spawn, ModSpawn.SKIP when mod is skipped
     */
    protected shouldModBeSpawned(itemSlot: ISlot, modSlotName: string, modSpawnChances: IModsChances, botEquipConfig: EquipmentFilters): ModSpawn;
    /**
     * Choose a mod to fit into the desired slot
     * @param request Data used to choose an appropriate mod with
     * @returns itemHelper.getItem() result
     */
    protected chooseModToPutIntoSlot(request: IModToSpawnRequest): [boolean, ITemplateItem] | undefined;
    /**
     * Given the passed in array of magaizne tpls, look up the min size set in config and return only those that have that size or larger
     * @param modSpawnRequest Request data
     * @param modPool Pool of magazine tpls to filter
     * @returns Filtered pool of magazine tpls
     */
    protected getFilterdMagazinePoolByCapacity(modSpawnRequest: IModToSpawnRequest, modPool: string[]): string[];
    /**
     * Choose a weapon mod tpl for a given slot from a pool of choices
     * Checks chosen tpl is compatible with all existing weapon items
     * @param modPool Pool of mods that can be picked from
     * @param parentSlot Slot the picked mod will have as a parent
     * @param choiceTypeEnum How should chosen tpl be treated: DEFAULT_MOD/SPAWN/SKIP
     * @param weapon Array of weapon items chosen item will be added to
     * @param modSlotName Name of slot picked mod will be placed into
     * @returns Chosen weapon details
     */
    protected getCompatibleWeaponModTplForSlotFromPool(request: IModToSpawnRequest, modPool: string[], parentSlot: ISlot, choiceTypeEnum: ModSpawn, weapon: IItem[], modSlotName: string): IChooseRandomCompatibleModResult;
    /**
     *
     * @param modPool Pool of item Tpls to choose from
     * @param modSpawnType How should the slot choice be handled - forced/normal etc
     * @param weapon Weapon mods at current time
     * @param modSlotName Name of mod slot being filled
     * @returns IChooseRandomCompatibleModResult
     */
    protected getCompatibleModFromPool(modPool: string[], modSpawnType: ModSpawn, weapon: IItem[]): IChooseRandomCompatibleModResult;
    protected createExhaustableArray<T>(itemsToAddToArray: T[]): ExhaustableArray<T>;
    /**
     * Get a list of mod tpls that are compatible with the current weapon
     * @param modPool
     * @param tplBlacklist Tpls that are incompatible and should not be used
     * @returns string array of compatible mod tpls with weapon
     */
    protected getFilteredModPool(modPool: string[], tplBlacklist: Set<string>): string[];
    /**
     * Filter mod pool down based on various criteria:
     * Is slot flagged as randomisable
     * Is slot required
     * Is slot flagged as default mod only
     * @param request
     * @param weaponTemplate Mods root parent (weapon/equipment)
     * @returns Array of mod tpls
     */
    protected getModPoolForSlot(request: IModToSpawnRequest, weaponTemplate: ITemplateItem): string[];
    protected getModPoolForDefaultSlot(request: IModToSpawnRequest, weaponTemplate: ITemplateItem): string[];
    protected getMatchingModFromPreset(request: IModToSpawnRequest, weaponTemplate: ITemplateItem): IItem;
    /**
     * Get default preset for weapon OR get specific weapon presets for edge cases (mp5/silenced dvl)
     * @param weaponTemplate Weapons db template
     * @param parentItemTpl Tpl of the parent item
     * @returns Default preset found
     */
    protected getMatchingPreset(weaponTemplate: ITemplateItem, parentItemTpl: string): IPreset | undefined;
    /**
     * Temp fix to prevent certain combinations of weapons with mods that are known to be incompatible
     * @param weapon Array of items that make up a weapon
     * @param modTpl Mod to check compatibility with weapon
     * @returns True if incompatible
     */
    protected weaponModComboIsIncompatible(weapon: IItem[], modTpl: string): boolean;
    /**
     * Create a mod item with provided parameters as properties + add upd property
     * @param modId _id
     * @param modTpl _tpl
     * @param parentId parentId
     * @param modSlot slotId
     * @param modTemplate Used to add additional properties in the upd object
     * @param botRole The bots role mod is being created for
     * @returns Item object
     */
    protected createModItem(modId: string, modTpl: string, parentId: string, modSlot: string, modTemplate: ITemplateItem, botRole: string): IItem;
    /**
     * Get a list of containers that hold ammo
     * e.g. mod_magazine / patron_in_weapon_000
     * @returns string array
     */
    protected getAmmoContainers(): string[];
    /**
     * Get a random mod from an items compatible mods Filter array
     * @param fallbackModTpl Default value to return if parentSlot Filter is empty
     * @param parentSlot Item mod will go into, used to get compatible items
     * @param modSlot Slot to get mod to fill
     * @param items Items to ensure picked mod is compatible with
     * @returns Item tpl
     */
    protected getRandomModTplFromItemDb(fallbackModTpl: string, parentSlot: ISlot, modSlot: string, items: IItem[]): string | undefined;
    /**
     * Check if mod exists in db + is for a required slot
     * @param modToAdd Db template of mod to check
     * @param slotAddedToTemplate Slot object the item will be placed as child into
     * @param modSlot Slot the mod will fill
     * @param parentTemplate Db template of the mods being added
     * @param botRole Bots wildspawntype (assault/pmcBot/exUsec etc)
     * @returns True if valid for slot
     */
    protected isModValidForSlot(modToAdd: [boolean, ITemplateItem], slotAddedToTemplate: ISlot, modSlot: string, parentTemplate: ITemplateItem, botRole: string): boolean;
    /**
     * Find mod tpls of a provided type and add to modPool
     * @param desiredSlotName Slot to look up and add we are adding tpls for (e.g mod_scope)
     * @param modTemplate db object for modItem we get compatible mods from
     * @param modPool Pool of mods we are adding to
     * @param botEquipBlacklist A blacklist of items that cannot be picked
     */
    protected addCompatibleModsForProvidedMod(desiredSlotName: string, modTemplate: ITemplateItem, modPool: IMods, botEquipBlacklist: IEquipmentFilterDetails): void;
    /**
     * Get the possible items that fit a slot
     * @param parentItemId item tpl to get compatible items for
     * @param modSlot Slot item should fit in
     * @param botEquipBlacklist Equipment that should not be picked
     * @returns Array of compatible items for that slot
     */
    protected getDynamicModPool(parentItemId: string, modSlot: string, botEquipBlacklist: IEquipmentFilterDetails): string[];
    /**
     * Take a list of tpls and filter out blacklisted values using itemFilterService + botEquipmentBlacklist
     * @param allowedMods Base mods to filter
     * @param botEquipBlacklist Equipment blacklist
     * @param modSlot Slot mods belong to
     * @returns Filtered array of mod tpls
     */
    protected filterModsByBlacklist(allowedMods: string[], botEquipBlacklist: IEquipmentFilterDetails, modSlot: string): string[];
    /**
     * With the shotgun revolver (60db29ce99594040e04c4a27) 12.12 introduced CylinderMagazines.
     * Those magazines (e.g. 60dc519adf4c47305f6d410d) have a "Cartridges" entry with a _max_count=0.
     * Ammo is not put into the magazine directly but assigned to the magazine's slots: The "camora_xxx" slots.
     * This function is a helper called by generateModsForItem for mods with parent type "CylinderMagazine"
     * @param items The items where the CylinderMagazine's camora are appended to
     * @param modPool ModPool which should include available cartridges
     * @param cylinderMagParentId The CylinderMagazine's UID
     * @param cylinderMagTemplate The CylinderMagazine's template
     */
    protected fillCamora(items: IItem[], modPool: IMods, cylinderMagParentId: string, cylinderMagTemplate: ITemplateItem): void;
    /**
     * Take a record of camoras and merge the compatible shells into one array
     * @param camorasWithShells Dictionary of camoras we want to merge into one array
     * @returns String array of shells for multiple camora sources
     */
    protected mergeCamoraPools(camorasWithShells: Record<string, string[]>): string[];
    /**
     * Filter out non-whitelisted weapon scopes
     * Controlled by bot.json weaponSightWhitelist
     * e.g. filter out rifle scopes from SMGs
     * @param weapon Weapon scopes will be added to
     * @param scopes Full scope pool
     * @param botWeaponSightWhitelist Whitelist of scope types by weapon base type
     * @returns Array of scope tpls that have been filtered to just ones allowed for that weapon type
     */
    protected filterSightsByWeaponType(weapon: IItem, scopes: string[], botWeaponSightWhitelist: Record<string, string[]>): string[];
}
