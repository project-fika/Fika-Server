import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IProps, ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { CreateItemResult, LocaleDetails, NewItemDetails, NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemBaseClassService } from "@spt/services/ItemBaseClassService";
import { HashUtil } from "@spt/utils/HashUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class CustomItemService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected itemBaseClassService: ItemBaseClassService;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseService: DatabaseService, itemHelper: ItemHelper, itemBaseClassService: ItemBaseClassService, cloner: ICloner);
    /**
     * Create a new item from a cloned item base
     * WARNING - If no item id is supplied, an id will be generated, this id will be random every time you add an item and will not be the same on each subsequent server start
     * Add to the items db
     * Add to the flea market
     * Add to the handbook
     * Add to the locales
     * @param newItemDetails Item details for the new item to be created
     * @returns tplId of the new item created
     */
    createItemFromClone(newItemDetails: NewItemFromCloneDetails): CreateItemResult;
    /**
     * Create a new item without using an existing item as a template
     * Add to the items db
     * Add to the flea market
     * Add to the handbook
     * Add to the locales
     * @param newItemDetails Details on what the item to be created
     * @returns CreateItemResult containing the completed items Id
     */
    createItem(newItemDetails: NewItemDetails): CreateItemResult;
    /**
     * If the id provided is an empty string, return a randomly generated guid, otherwise return the newId parameter
     * @param newId id supplied to code
     * @returns item id
     */
    protected getOrGenerateIdForItem(newId: string): string;
    /**
     * Iterates through supplied properties and updates the cloned items properties with them
     * Complex objects cannot have overrides, they must be fully hydrated with values if they are to be used
     * @param overrideProperties new properties to apply
     * @param itemClone item to update
     */
    protected updateBaseItemPropertiesWithOverrides(overrideProperties: IProps, itemClone: ITemplateItem): void;
    /**
     * Addd a new item object to the in-memory representation of items.json
     * @param newItemId id of the item to add to items.json
     * @param itemToAdd Item to add against the new id
     */
    protected addToItemsDb(newItemId: string, itemToAdd: ITemplateItem): void;
    /**
     * Add a handbook price for an item
     * @param newItemId id of the item being added
     * @param parentId parent id of the item being added
     * @param priceRoubles price of the item being added
     */
    protected addToHandbookDb(newItemId: string, parentId: string, priceRoubles: number): void;
    /**
     * Iterate through the passed in locale data and add to each locale in turn
     * If data is not provided for each langauge eft uses, the first object will be used in its place
     * e.g.
     * en[0]
     * fr[1]
     *
     * No jp provided, so english will be used as a substitute
     * @param localeDetails key is language, value are the new locale details
     * @param newItemId id of the item being created
     */
    protected addToLocaleDbs(localeDetails: Record<string, LocaleDetails>, newItemId: string): void;
    /**
     * Add a price to the in-memory representation of prices.json, used to inform the flea of an items price on the market
     * @param newItemId id of the new item
     * @param fleaPriceRoubles Price of the new item
     */
    protected addToFleaPriceDb(newItemId: string, fleaPriceRoubles: number): void;
    /**
     * Add a weapon to the hideout weapon shelf whitelist
     * @param newItemId Weapon id to add
     */
    protected addToWeaponShelf(newItemId: string): void;
    /**
     * Add a custom weapon to PMCs loadout
     * @param weaponTpl Custom weapon tpl to add to PMCs
     * @param weaponWeight The weighting for the weapon to be picked vs other weapons
     * @param weaponSlot The slot the weapon should be added to (e.g. FirstPrimaryWeapon/SecondPrimaryWeapon/Holster)
     */
    addCustomWeaponToPMCs(weaponTpl: string, weaponWeight: number, weaponSlot: string): void;
}
