import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { IStaticAmmoDetails } from "@spt/models/eft/common/ILocation";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IInsuredItem } from "@spt/models/eft/common/tables/IBotBase";
import { IItem, IUpd, IUpdRepairable } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ItemTpl } from "@spt/models/enums/ItemTpl";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemBaseClassService } from "@spt/services/ItemBaseClassService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { CompareUtil } from "@spt/utils/CompareUtil";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { MathUtil } from "@spt/utils/MathUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ItemHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected randomUtil: RandomUtil;
    protected mathUtil: MathUtil;
    protected databaseService: DatabaseService;
    protected handbookHelper: HandbookHelper;
    protected itemBaseClassService: ItemBaseClassService;
    protected itemFilterService: ItemFilterService;
    protected localisationService: LocalisationService;
    protected localeService: LocaleService;
    protected compareUtil: CompareUtil;
    protected cloner: ICloner;
    protected readonly defaultInvalidBaseTypes: string[];
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, randomUtil: RandomUtil, mathUtil: MathUtil, databaseService: DatabaseService, handbookHelper: HandbookHelper, itemBaseClassService: ItemBaseClassService, itemFilterService: ItemFilterService, localisationService: LocalisationService, localeService: LocaleService, compareUtil: CompareUtil, cloner: ICloner);
    /**
     * Does the provided pool of items contain the desired item
     * @param itemPool Item collection to check
     * @param item Item to look for
     * @param slotId OPTIONAL - slotid of desired item
     * @returns True if pool contains item
     */
    hasItemWithTpl(itemPool: IItem[], item: ItemTpl, slotId?: string): boolean;
    /**
     * Get the first item from provided pool with the desired tpl
     * @param itemPool Item collection to search
     * @param item Item to look for
     * @param slotId OPTIONAL - slotid of desired item
     * @returns Item or undefined
     */
    getItemFromPoolByTpl(itemPool: IItem[], item: ItemTpl, slotId?: string): IItem | undefined;
    /**
     * This method will compare two items (with all its children) and see if the are equivalent.
     * This method will NOT compare IDs on the items
     * @param item1 first item with all its children to compare
     * @param item2 second item with all its children to compare
     * @param compareUpdProperties Upd properties to compare between the items
     * @returns true if they are the same, false if they arent
     */
    isSameItems(item1: IItem[], item2: IItem[], compareUpdProperties?: Set<string>): boolean;
    /**
     * This method will compare two items and see if the are equivalent.
     * This method will NOT compare IDs on the items
     * @param item1 first item to compare
     * @param item2 second item to compare
     * @param compareUpdProperties Upd properties to compare between the items
     * @returns true if they are the same, false if they arent
     */
    isSameItem(item1: IItem, item2: IItem, compareUpdProperties?: Set<string>): boolean;
    /**
     * Helper method to generate a Upd based on a template
     * @param itemTemplate the item template to generate a Upd for
     * @returns A Upd with all the default properties set
     */
    generateUpdForItem(itemTemplate: ITemplateItem): IUpd;
    /**
     * Checks if a tpl is a valid item. Valid meaning that it's an item that be stored in stash
     * Valid means:
     *  Not quest item
     *  'Item' type
     *  Not on the invalid base types array
     *  Price above 0 roubles
     *  Not on item config blacklist
     * @param    {string}  tpl  the template id / tpl
     * @returns                 boolean; true for items that may be in player possession and not quest items
     */
    isValidItem(tpl: string, invalidBaseTypes?: string[]): boolean;
    /**
     * Check if the tpl / template Id provided is a descendent of the baseclass
     *
     * @param   {string}    tpl             the item template id to check
     * @param   {string}    baseClassTpl    the baseclass to check for
     * @return  {boolean}                   is the tpl a descendent?
     */
    isOfBaseclass(tpl: string, baseClassTpl: string): boolean;
    /**
     * Check if item has any of the supplied base classes
     * @param tpl Item to check base classes of
     * @param baseClassTpls base classes to check for
     * @returns true if any supplied base classes match
     */
    isOfBaseclasses(tpl: string, baseClassTpls: string[]): boolean;
    /**
     * Does the provided item have the chance to require soft armor inserts
     * Only applies to helmets/vest/armors.
     * Not all head gear needs them
     * @param itemTpl item to check
     * @returns Does item have the possibility ot need soft inserts
     */
    armorItemCanHoldMods(itemTpl: string): boolean;
    /**
     * Does the provided item tpl need soft/removable inserts to function
     * @param itemTpl Armor item
     * @returns True if item needs some kind of insert
     */
    armorItemHasRemovableOrSoftInsertSlots(itemTpl: string): boolean;
    /**
     * Does the pased in tpl have ability to hold removable plate items
     * @param itemTpl item tpl to check for plate support
     * @returns True when armor can hold plates
     */
    armorItemHasRemovablePlateSlots(itemTpl: string): boolean;
    /**
     * Does the provided item tpl require soft inserts to become a valid armor item
     * @param itemTpl Item tpl to check
     * @returns True if it needs armor inserts
     */
    itemRequiresSoftInserts(itemTpl: string): boolean;
    /**
     * Get all soft insert slot ids
     * @returns An array of soft insert ids (e.g. soft_armor_back, helmet_top)
     */
    getSoftInsertSlotIds(): string[];
    /**
     * Returns the items total price based on the handbook or as a fallback from the prices.json if the item is not
     * found in the handbook. If the price can't be found at all return 0
     * @param tpls item tpls to look up the price of
     * @returns Total price in roubles
     */
    getItemAndChildrenPrice(tpls: string[]): number;
    /**
     * Returns the item price based on the handbook or as a fallback from the prices.json if the item is not
     * found in the handbook. If the price can't be found at all return 0
     * @param tpl Item to look price up of
     * @returns Price in roubles
     */
    getItemPrice(tpl: string): number;
    /**
     * Returns the item price based on the handbook or as a fallback from the prices.json if the item is not
     * found in the handbook. If the price can't be found at all return 0
     * @param tpl Item to look price up of
     * @returns Price in roubles
     */
    getItemMaxPrice(tpl: string): number;
    /**
     * Get the static (handbook) price in roubles for an item by tpl
     * @param tpl Items tpl id to look up price
     * @returns Price in roubles (0 if not found)
     */
    getStaticItemPrice(tpl: string): number;
    /**
     * Get the dynamic (flea) price in roubles for an item by tpl
     * @param tpl Items tpl id to look up price
     * @returns Price in roubles (undefined if not found)
     */
    getDynamicItemPrice(tpl: string): number;
    /**
     * Update items upd.StackObjectsCount to be 1 if its upd is missing or StackObjectsCount is undefined
     * @param item Item to update
     * @returns Fixed item
     */
    fixItemStackCount(item: IItem): IItem;
    /**
     * Get cloned copy of all item data from items.json
     * @returns array of ITemplateItem objects
     */
    getItems(): ITemplateItem[];
    /**
     * Gets item data from items.json
     * @param tpl items template id to look up
     * @returns bool - is valid + template item object as array
     */
    getItem(tpl: string): [boolean, ITemplateItem];
    itemHasSlots(itemTpl: string): boolean;
    isItemInDb(tpl: string): boolean;
    /**
     * Calcualte the average quality of an item and its children
     * @param items An offers item to process
     * @param skipArmorItemsWithoutDurability Skip over armor items without durability
     * @returns % quality modifer between 0 and 1
     */
    getItemQualityModifierForItems(items: IItem[], skipArmorItemsWithoutDurability?: boolean): number;
    /**
     * get normalized value (0-1) based on item condition
     * Will return -1 for base armor items with 0 durability
     * @param item
     * @param skipArmorItemsWithoutDurability return -1 for armor items that have maxdurability of 0
     * @returns Number between 0 and 1
     */
    getItemQualityModifier(item: IItem, skipArmorItemsWithoutDurability?: boolean): number;
    /**
     * Get a quality value based on a repairable items (weapon/armor) current state between current and max durability
     * @param itemDetails Db details for item we want quality value for
     * @param repairable Repairable properties
     * @param item Item quality value is for
     * @returns A number between 0 and 1
     */
    protected getRepairableItemQualityValue(itemDetails: ITemplateItem, repairable: IUpdRepairable, item: IItem): number;
    /**
     * Recursive function that looks at every item from parameter and gets their childrens Ids + includes parent item in results
     * @param items Array of items (item + possible children)
     * @param baseItemId Parent items id
     * @returns an array of strings
     */
    findAndReturnChildrenByItems(items: IItem[], baseItemId: string): string[];
    /**
     * A variant of findAndReturnChildren where the output is list of item objects instead of their ids.
     * @param items Array of items (item + possible children)
     * @param baseItemId Parent items id
     * @param modsOnly Include only mod items, exclude items stored inside root item
     * @returns An array of Item objects
     */
    findAndReturnChildrenAsItems(items: IItem[], baseItemId: string, modsOnly?: boolean): IItem[];
    /**
     * Find children of the item in a given assort (weapons parts for example, need recursive loop function)
     * @param itemIdToFind Template id of item to check for
     * @param assort Array of items to check in
     * @returns Array of children of requested item
     */
    findAndReturnChildrenByAssort(itemIdToFind: string, assort: IItem[]): IItem[];
    /**
     * Check if the passed in item has buy count restrictions
     * @param itemToCheck Item to check
     * @returns true if it has buy restrictions
     */
    hasBuyRestrictions(itemToCheck: IItem): boolean;
    /**
     * is the passed in template id a dog tag
     * @param tpl Template id to check
     * @returns true if it is a dogtag
     */
    isDogtag(tpl: string): boolean;
    /**
     * Gets the identifier for a child using slotId, locationX and locationY.
     * @param item
     * @returns "slotId OR slotid,locationX,locationY"
     */
    getChildId(item: IItem): string;
    /**
     * Can the passed in item be stacked
     * @param tpl item to check
     * @returns true if it can be stacked
     */
    isItemTplStackable(tpl: string): boolean;
    /**
     * Split item stack if it exceeds its items StackMaxSize property into child items of passed in parent
     * @param itemToSplit Item to split into smaller stacks
     * @returns Array of root item + children
     */
    splitStack(itemToSplit: IItem): IItem[];
    /**
     * Turn items like money into separate stacks that adhere to max stack size
     * @param itemToSplit Item to split into smaller stacks
     * @returns
     */
    splitStackIntoSeparateItems(itemToSplit: IItem): IItem[][];
    /**
     * Find Barter items from array of items
     * @param {string} by tpl or id
     * @param {IItem[]} itemsToSearch Array of items to iterate over
     * @param {string} desiredBarterItemIds
     * @returns Array of Item objects
     */
    findBarterItems(by: "tpl" | "id", itemsToSearch: IItem[], desiredBarterItemIds: string | string[]): IItem[];
    /**
     * Replace the _id value for base item + all children that are children of it
     * REPARENTS ROOT ITEM ID, NOTHING ELSE
     * @param itemWithChildren Item with mods to update
     * @param newId new id to add on chidren of base item
     */
    replaceRootItemID(itemWithChildren: IItem[], newId?: string): void;
    /**
     * Regenerate all GUIDs with new IDs, for the exception of special item types (e.g. quest, sorting table, etc.) This
     * function will not mutate the original items array, but will return a new array with new GUIDs.
     *
     * @param originalItems Items to adjust the IDs of
     * @param pmcData Player profile
     * @param insuredItems Insured items that should not have their IDs replaced
     * @param fastPanel Quick slot panel
     * @returns Item[]
     */
    replaceIDs(originalItems: IItem[], pmcData?: IPmcData, insuredItems?: IInsuredItem[], fastPanel?: any): IItem[];
    /**
     * Mark the passed in array of items as found in raid.
     * Modifies passed in items
     * @param items The list of items to mark as FiR
     * @param excludeCurrency Should currency be excluded from becoming FiR (default true)
     */
    setFoundInRaid(items: IItem[], excludeCurrency?: boolean): void;
    /**
     * WARNING, SLOW. Recursively loop down through an items hierarchy to see if any of the ids match the supplied list, return true if any do
     * @param tpl Items tpl to check parents of
     * @param tplsToCheck Tpl values to check if parents of item match
     * @returns boolean Match found
     */
    doesItemOrParentsIdMatch(tpl: string, tplsToCheck: string[]): boolean;
    /**
     * Check if item is quest item
     * @param tpl Items tpl to check quest status of
     * @returns true if item is flagged as quest item
     */
    isQuestItem(tpl: string): boolean;
    /**
     * Checks to see if the item is *actually* moddable in-raid. Checks include the items existence in the database, the
     * parent items existence in the database, the existence (and value) of the items RaidModdable property, and that
     * the parents slot-required property exists, matches that of the item, and it's value.
     *
     * Note: this function does not preform any checks to see if the item and parent are *actually* related.
     *
     * @param item The item to be checked
     * @param parent The parent of the item to be checked
     * @returns True if the item is actually moddable, false if it is not, and undefined if the check cannot be performed.
     */
    isRaidModdable(item: IItem, parent: IItem): boolean | undefined;
    /**
     * Retrieves the main parent item for a given attachment item.
     *
     * This method traverses up the hierarchy of items starting from a given `itemId`, until it finds the main parent
     * item that is not an attached attachment itself. In other words, if you pass it an item id of a suppressor, it
     * will traverse up the muzzle brake, barrel, upper receiver, and return the gun that the suppressor is ultimately
     * attached to, even if that gun is located within multiple containers.
     *
     * It's important to note that traversal is expensive, so this method requires that you pass it a Map of the items
     * to traverse, where the keys are the item IDs and the values are the corresponding Item objects. This alleviates
     * some of the performance concerns, as it allows for quick lookups of items by ID.
     *
     * @param itemId - The unique identifier of the item for which to find the main parent.
     * @param itemsMap - A Map containing item IDs mapped to their corresponding Item objects for quick lookup.
     * @returns The Item object representing the top-most parent of the given item, or `undefined` if no such parent exists.
     */
    getAttachmentMainParent(itemId: string, itemsMap: Map<string, IItem>): IItem | undefined;
    /**
     * Determines if an item is an attachment that is currently attached to it's parent item.
     *
     * @param item The item to check.
     * @returns true if the item is attached attachment, otherwise false.
     */
    isAttachmentAttached(item: IItem): boolean;
    /**
     * Retrieves the equipment parent item for a given item.
     *
     * This method traverses up the hierarchy of items starting from a given `itemId`, until it finds the equipment
     * parent item. In other words, if you pass it an item id of a suppressor, it will traverse up the muzzle brake,
     * barrel, upper receiver, gun, nested backpack, and finally return the backpack Item that is equipped.
     *
     * It's important to note that traversal is expensive, so this method requires that you pass it a Map of the items
     * to traverse, where the keys are the item IDs and the values are the corresponding Item objects. This alleviates
     * some of the performance concerns, as it allows for quick lookups of items by ID.
     *
     * @param itemId - The unique identifier of the item for which to find the equipment parent.
     * @param itemsMap - A Map containing item IDs mapped to their corresponding Item objects for quick lookup.
     * @returns The Item object representing the equipment parent of the given item, or `undefined` if no such parent exists.
     */
    getEquipmentParent(itemId: string, itemsMap: Map<string, IItem>): IItem | undefined;
    /**
     * Get the inventory size of an item
     * @param items Item with children
     * @param rootItemId
     * @returns ItemSize object (width and height)
     */
    getItemSize(items: IItem[], rootItemId: string): ItemHelper.IItemSize;
    /**
     * Get a random cartridge from an items Filter property
     * @param item Db item template to look up Cartridge filter values from
     * @returns Caliber of cartridge
     */
    getRandomCompatibleCaliberTemplateId(item: ITemplateItem): string | undefined;
    /**
     * Add cartridges to the ammo box with correct max stack sizes
     * @param ammoBox Box to add cartridges to
     * @param ammoBoxDetails Item template from items db
     */
    addCartridgesToAmmoBox(ammoBox: IItem[], ammoBoxDetails: ITemplateItem): void;
    /**
     * Add a single stack of cartridges to the ammo box
     * @param ammoBox Box to add cartridges to
     * @param ammoBoxDetails Item template from items db
     */
    addSingleStackCartridgesToAmmoBox(ammoBox: IItem[], ammoBoxDetails: ITemplateItem): void;
    /**
     * Check if item is stored inside of a container
     * @param itemToCheck Item to check is inside of container
     * @param desiredContainerSlotId Name of slot to check item is in e.g. SecuredContainer/Backpack
     * @param items Inventory with child parent items to check
     * @returns True when item is in container
     */
    itemIsInsideContainer(itemToCheck: IItem, desiredContainerSlotId: string, items: IItem[]): boolean;
    /**
     * Add child items (cartridges) to a magazine
     * @param magazine Magazine to add child items to
     * @param magTemplate Db template of magazine
     * @param staticAmmoDist Cartridge distribution
     * @param caliber Caliber of cartridge to add to magazine
     * @param minSizePercent % the magazine must be filled to
     * @param defaultCartridgeTpl Cartridge to use when none found
     * @param weapon Weapon the magazine will be used for (if passed in uses Chamber as whitelist)
     */
    fillMagazineWithRandomCartridge(magazine: IItem[], magTemplate: ITemplateItem, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, caliber?: string, minSizePercent?: number, defaultCartridgeTpl?: string, weapon?: ITemplateItem): void;
    /**
     * Add child items to a magazine of a specific cartridge
     * @param magazineWithChildCartridges Magazine to add child items to
     * @param magTemplate Db template of magazine
     * @param cartridgeTpl Cartridge to add to magazine
     * @param minSizeMultiplier % the magazine must be filled to
     */
    fillMagazineWithCartridge(magazineWithChildCartridges: IItem[], magTemplate: ITemplateItem, cartridgeTpl: string, minSizeMultiplier?: number): void;
    /**
     * Choose a random bullet type from the list of possible a magazine has
     * @param magTemplate Magazine template from Db
     * @returns Tpl of cartridge
     */
    protected getRandomValidCaliber(magTemplate: ITemplateItem): string;
    /**
     * Chose a randomly weighted cartridge that fits
     * @param caliber Desired caliber
     * @param staticAmmoDist Cartridges and thier weights
     * @param fallbackCartridgeTpl If a cartridge cannot be found in the above staticAmmoDist param, use this instead
     * @param cartridgeWhitelist OPTIONAL whitelist for cartridges
     * @returns Tpl of cartridge
     */
    protected drawAmmoTpl(caliber: string, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, fallbackCartridgeTpl: string, cartridgeWhitelist?: string[]): string | undefined;
    /**
     * Create a basic cartrige object
     * @param parentId container cartridges will be placed in
     * @param ammoTpl Cartridge to insert
     * @param stackCount Count of cartridges inside parent
     * @param location Location inside parent (e.g. 0, 1)
     * @param foundInRaid OPTIONAL - Are cartridges found in raid (SpawnedInSession)
     * @returns Item
     */
    createCartridges(parentId: string, ammoTpl: string, stackCount: number, location: number, foundInRaid?: boolean): IItem;
    /**
     * Get the size of a stack, return 1 if no stack object count property found
     * @param item Item to get stack size of
     * @returns size of stack
     */
    getItemStackSize(item: IItem): number;
    /**
     * Get the name of an item from the locale file using the item tpl
     * @param itemTpl Tpl of item to get name of
     * @returns Full name, short name if not found
     */
    getItemName(itemTpl: string): string;
    /**
     * Get all item tpls with a desired base type
     * @param desiredBaseType Item base type wanted
     * @returns Array of tpls
     */
    getItemTplsOfBaseType(desiredBaseType: string): string[];
    /**
     * Add child slot items to an item, chooses random child item if multiple choices exist
     * @param itemToAdd array with single object (root item)
     * @param itemToAddTemplate Db tempalte for root item
     * @param modSpawnChanceDict Optional dictionary of mod name + % chance mod will be included in item (e.g. front_plate: 100)
     * @param requiredOnly Only add required mods
     * @returns Item with children
     */
    addChildSlotItems(itemToAdd: IItem[], itemToAddTemplate: ITemplateItem, modSpawnChanceDict?: Record<string, number>, requiredOnly?: boolean): IItem[];
    /**
     * Get a compatible tpl from the array provided where it is not found in the provided incompatible mod tpls parameter
     * @param possibleTpls Tpls to randomly choose from
     * @param incompatibleModTpls Incompatible tpls to not allow
     * @returns Chosen tpl or undefined
     */
    getCompatibleTplFromArray(possibleTpls: string[], incompatibleModTpls: Set<string>): string | undefined;
    /**
     * Is the provided item._props.Slots._name property a plate slot
     * @param slotName Name of slot (_name) of Items Slot array
     * @returns True if its a slot that holds a removable palte
     */
    isRemovablePlateSlot(slotName: string): boolean;
    /**
     * Get a list of slot names that hold removable plates
     * @returns Array of slot ids (e.g. front_plate)
     */
    getRemovablePlateSlotIds(): string[];
    /**
     * Generate new unique ids for child items while preserving hierarchy
     * @param rootItem Base/primary item
     * @param itemWithChildren Primary item + children of primary item
     * @returns Item array with updated IDs
     */
    reparentItemAndChildren(rootItem: IItem, itemWithChildren: IItem[]): IItem[];
    /**
     * Update a root items _id property value to be unique
     * @param itemWithChildren Item to update root items _id property
     * @param newId Optional: new id to use
     * @returns New root id
     */
    remapRootItemId(itemWithChildren: IItem[], newId?: string): string;
    /**
     * Adopts orphaned items by resetting them as root "hideout" items. Helpful in situations where a parent has been
     * deleted from a group of items and there are children still referencing the missing parent. This method will
     * remove the reference from the children to the parent and set item properties to root values.
     *
     * @param rootId The ID of the "root" of the container.
     * @param items Array of Items that should be adjusted.
     * @returns Array of Items that have been adopted.
     */
    adoptOrphanedItems(rootId: string, items: IItem[]): IItem[];
    /**
     * Populate a Map object of items for quick lookup using their ID.
     *
     * @param items An array of Items that should be added to a Map.
     * @returns A Map where the keys are the item IDs and the values are the corresponding Item objects.
     */
    generateItemsMap(items: IItem[]): Map<string, IItem>;
    /**
     * Add a blank upd object to passed in item if it does not exist already
     * @param item item to add upd to
     * @param warningMessageWhenMissing text to write to log when upd object was not found
     * @returns True when upd object was added
     */
    addUpdObjectToItem(item: IItem, warningMessageWhenMissing?: string): boolean;
    /**
     * Return all tpls from Money enum
     * @returns string tpls
     */
    getMoneyTpls(): string[];
    /**
     * Get a randomsied stack size for the passed in ammo
     * @param ammoItemTemplate Ammo to get stack size for
     * @param maxLimit default: Limit to 60 to prevent crazy values when players use stack increase mods
     * @returns number
     */
    getRandomisedAmmoStackSize(ammoItemTemplate: ITemplateItem, maxLimit?: number): number;
    getItemBaseType(tpl: string, rootOnly?: boolean): string;
    /**
     * Remove FiR status from passed in items
     * @param items Items to update FiR status of
     */
    removeSpawnedInSessionPropertyFromItems(items: IItem[]): void;
}
declare namespace ItemHelper {
    interface IItemSize {
        width: number;
        height: number;
    }
}
export {};
