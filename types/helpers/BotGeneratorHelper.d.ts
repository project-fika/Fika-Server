import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ContainerHelper } from "@spt/helpers/ContainerHelper";
import { DurabilityLimitsHelper } from "@spt/helpers/DurabilityLimitsHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IInventory } from "@spt/models/eft/common/tables/IBotBase";
import { IItem, IUpd, IUpdRepairable } from "@spt/models/eft/common/tables/IItem";
import { IGrid, ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ItemAddedResult } from "@spt/models/enums/ItemAddedResult";
import { IChooseRandomCompatibleModResult } from "@spt/models/spt/bots/IChooseRandomCompatibleModResult";
import { EquipmentFilters, IBotConfig, IRandomisedResourceValues } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotGeneratorHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected durabilityLimitsHelper: DurabilityLimitsHelper;
    protected itemHelper: ItemHelper;
    protected inventoryHelper: InventoryHelper;
    protected containerHelper: ContainerHelper;
    protected applicationContext: ApplicationContext;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, durabilityLimitsHelper: DurabilityLimitsHelper, itemHelper: ItemHelper, inventoryHelper: InventoryHelper, containerHelper: ContainerHelper, applicationContext: ApplicationContext, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Adds properties to an item
     * e.g. Repairable / HasHinge / Foldable / MaxDurability
     * @param itemTemplate Item extra properties are being generated for
     * @param botRole Used by weapons to randomize the durability values. Null for non-equipped items
     * @returns Item Upd object with extra properties
     */
    generateExtraPropertiesForItem(itemTemplate: ITemplateItem, botRole?: string): {
        upd?: IUpd;
    };
    /**
     * Randomize the HpResource for bots e.g (245/400 resources)
     * @param maxResource Max resource value of medical items
     * @param randomizationValues Value provided from config
     * @returns Randomized value from maxHpResource
     */
    protected getRandomizedResourceValue(maxResource: number, randomizationValues: IRandomisedResourceValues): number;
    /**
     * Get the chance for the weapon attachment or helmet equipment to be set as activated
     * @param botRole role of bot with weapon/helmet
     * @param setting the setting of the weapon attachment/helmet equipment to be activated
     * @param defaultValue default value for the chance of activation if the botrole or bot equipment role is undefined
     * @returns Percent chance to be active
     */
    protected getBotEquipmentSettingFromConfig(botRole: string | undefined, setting: keyof EquipmentFilters, defaultValue: number): number;
    /**
     * Create a repairable object for a weapon that containers durability + max durability properties
     * @param itemTemplate weapon object being generated for
     * @param botRole type of bot being generated for
     * @returns Repairable object
     */
    protected generateWeaponRepairableProperties(itemTemplate: ITemplateItem, botRole?: string): IUpdRepairable;
    /**
     * Create a repairable object for an armor that containers durability + max durability properties
     * @param itemTemplate weapon object being generated for
     * @param botRole type of bot being generated for
     * @returns Repairable object
     */
    protected generateArmorRepairableProperties(itemTemplate: ITemplateItem, botRole?: string): IUpdRepairable;
    /**
     * Can item be added to another item without conflict
     * @param itemsEquipped Items to check compatibilities with
     * @param tplToCheck Tpl of the item to check for incompatibilities
     * @param equipmentSlot Slot the item will be placed into
     * @returns false if no incompatibilities, also has incompatibility reason
     */
    isItemIncompatibleWithCurrentItems(itemsEquipped: IItem[], tplToCheck: string, equipmentSlot: string): IChooseRandomCompatibleModResult;
    /**
     * Convert a bots role to the equipment role used in config/bot.json
     * @param botRole Role to convert
     * @returns Equipment role (e.g. pmc / assault / bossTagilla)
     */
    getBotEquipmentRole(botRole: string): string;
    /**
     * Adds an item with all its children into specified equipmentSlots, wherever it fits.
     * @param equipmentSlots Slot to add item+children into
     * @param rootItemId Root item id to use as mod items parentid
     * @param rootItemTplId Root itms tpl id
     * @param itemWithChildren Item to add
     * @param inventory Inventory to add item+children into
     * @returns ItemAddedResult result object
     */
    addItemWithChildrenToEquipmentSlot(equipmentSlots: string[], rootItemId: string, rootItemTplId: string, itemWithChildren: IItem[], inventory: IInventory, containersIdFull?: Set<string>): ItemAddedResult;
    /**
     * Is the provided item allowed inside a container
     * @param slotGrid Items sub-grid we want to place item inside
     * @param itemTpl Item tpl being placed
     * @returns True if allowed
     */
    protected itemAllowedInContainer(slotGrid: IGrid, itemTpl: string): boolean;
}
