import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
export declare class RagfairLinkedItemService {
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected logger: ILogger;
    protected linkedItemsCache: Record<string, Set<string>>;
    constructor(databaseService: DatabaseService, itemHelper: ItemHelper, logger: ILogger);
    getLinkedItems(linkedSearchId: string): Set<string>;
    /**
     * Use ragfair linked item service to get an array of items that can fit on or in designated itemtpl
     * @param itemTpl Item to get sub-items for
     * @returns ITemplateItem array
     */
    getLinkedDbItems(itemTpl: string): ITemplateItem[];
    /**
     * Create Dictionary of every item and the items associated with it
     */
    protected buildLinkedItemTable(): void;
    /**
     * Add ammo to revolvers linked item dictionary
     * @param cylinder Revolvers cylinder
     * @param applyLinkedItems
     */
    protected addRevolverCylinderAmmoToLinkedItems(cylinder: ITemplateItem, applyLinkedItems: (items: string[]) => void): void;
    /**
     * Scans a given slot type for filters and returns them as a Set
     * @param item
     * @param slot
     * @returns array of ids
     */
    protected getFilters(item: ITemplateItem, slot: string): string[];
}
