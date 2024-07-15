import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { TraderAssortHelper } from "@spt/helpers/TraderAssortHelper";
import { UtilityHelper } from "@spt/helpers/UtilityHelper";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITraderAssort } from "@spt/models/eft/common/tables/ITrader";
import { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RagfairLinkedItemService } from "@spt/services/RagfairLinkedItemService";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RagfairHelper {
    protected logger: ILogger;
    protected traderAssortHelper: TraderAssortHelper;
    protected databaseService: DatabaseService;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected utilityHelper: UtilityHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, traderAssortHelper: TraderAssortHelper, databaseService: DatabaseService, handbookHelper: HandbookHelper, itemHelper: ItemHelper, ragfairLinkedItemService: RagfairLinkedItemService, utilityHelper: UtilityHelper, configServer: ConfigServer, cloner: ICloner);
    /**
     * Gets currency TAG from TPL
     * @param {string} currency
     * @returns string
     */
    getCurrencyTag(currency: string): string;
    filterCategories(sessionID: string, request: ISearchRequestData): string[];
    getDisplayableAssorts(sessionID: string): Record<string, ITraderAssort>;
    protected getCategoryList(handbookId: string): string[];
    /**
     * Merges Root Items
     * Ragfair allows abnormally large stacks.
     */
    mergeStackable(items: Item[]): Item[];
    /**
     * Return the symbol for a currency
     * e.g. 5449016a4bdc2d6f028b456f return ₽
     * @param currencyTpl currency to get symbol for
     * @returns symbol of currency
     */
    getCurrencySymbol(currencyTpl: string): string;
}
