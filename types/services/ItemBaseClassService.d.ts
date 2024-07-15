import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
/**
 * Cache the baseids for each item in the tiems db inside a dictionary
 */
export declare class ItemBaseClassService {
    protected logger: ILogger;
    protected localisationService: LocalisationService;
    protected databaseService: DatabaseService;
    protected itemBaseClassesCache: Record<string, string[]>;
    protected items: Record<string, ITemplateItem>;
    protected cacheGenerated: boolean;
    constructor(logger: ILogger, localisationService: LocalisationService, databaseService: DatabaseService);
    /**
     * Create cache and store inside ItemBaseClassService
     * Store a dict of an items tpl to the base classes it and its parents have
     */
    hydrateItemBaseClassCache(): void;
    /**
     * Helper method, recursivly iterate through items parent items, finding and adding ids to dictionary
     * @param itemIdToUpdate item tpl to store base ids against in dictionary
     * @param item item being checked
     */
    protected addBaseItems(itemIdToUpdate: string, item: ITemplateItem): void;
    /**
     * Does item tpl inherit from the requested base class
     * @param itemTpl item to check base classes of
     * @param baseClass base class to check for
     * @returns true if item inherits from base class passed in
     */
    itemHasBaseClass(itemTpl: string, baseClasses: string[]): boolean;
    /**
     * Check if cached item template is of type Item
     * @param itemTemplateId item to check
     * @returns true if item is of type Item
     */
    private cachedItemIsOfItemType;
    /**
     * Get base classes item inherits from
     * @param itemTpl item to get base classes for
     * @returns array of base classes
     */
    getItemBaseClasses(itemTpl: string): string[];
}
