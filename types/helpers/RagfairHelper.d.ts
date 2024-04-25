import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { TraderAssortHelper } from "@spt-aki/helpers/TraderAssortHelper";
import { UtilityHelper } from "@spt-aki/helpers/UtilityHelper";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { RagfairLinkedItemService } from "@spt-aki/services/RagfairLinkedItemService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class RagfairHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected traderAssortHelper: TraderAssortHelper;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected utilityHelper: UtilityHelper;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, traderAssortHelper: TraderAssortHelper, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemHelper: ItemHelper, ragfairLinkedItemService: RagfairLinkedItemService, utilityHelper: UtilityHelper, configServer: ConfigServer);
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
