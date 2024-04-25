import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PaymentHelper } from "@spt-aki/helpers/PaymentHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessBuyTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBuyTradeRequestData";
import { IProcessSellTradeRequestData } from "@spt-aki/models/eft/trade/IProcessSellTradeRequestData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class PaymentService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected httpResponse: HttpResponseUtil;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected traderHelper: TraderHelper;
    protected itemHelper: ItemHelper;
    protected inventoryHelper: InventoryHelper;
    protected localisationService: LocalisationService;
    protected paymentHelper: PaymentHelper;
    constructor(logger: ILogger, hashUtil: HashUtil, httpResponse: HttpResponseUtil, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, traderHelper: TraderHelper, itemHelper: ItemHelper, inventoryHelper: InventoryHelper, localisationService: LocalisationService, paymentHelper: PaymentHelper);
    /**
     * Take money and insert items into return to server request
     * @param pmcData Pmc profile
     * @param request Buy item request
     * @param sessionID Session id
     * @param output Client response
     */
    payMoney(pmcData: IPmcData, request: IProcessBuyTradeRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Get the item price of a specific traders assort
     * @param traderAssortId Id of assort to look up
     * @param traderId Id of trader with assort
     * @returns Handbook rouble price of item
     */
    protected getTraderItemHandbookPriceRouble(traderAssortId: string, traderId: string): number;
    /**
     * Receive money back after selling
     * @param {IPmcData} pmcData
     * @param {number} amountToSend
     * @param {IProcessSellTradeRequestData} request
     * @param {IItemEventRouterResponse} output
     * @param {string} sessionID
     * @returns IItemEventRouterResponse
     */
    giveProfileMoney(pmcData: IPmcData, amountToSend: number, request: IProcessSellTradeRequestData, output: IItemEventRouterResponse, sessionID: string): void;
    /**
     * Remove currency from player stash/inventory and update client object with changes
     * @param pmcData Player profile to find and remove currency from
     * @param currencyTpl Type of currency to pay
     * @param amountToPay money value to pay
     * @param sessionID Session id
     * @param output output object to send to client
     */
    addPaymentToOutput(pmcData: IPmcData, currencyTpl: string, amountToPay: number, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Get all money stacks in inventory and prioritse items in stash
     * @param pmcData
     * @param currencyTpl
     * @param playerStashId Players stash id
     * @returns Sorting money items
     */
    protected getSortedMoneyItemsInInventory(pmcData: IPmcData, currencyTpl: string, playerStashId: string): Item[];
    /**
     * Prioritise player stash first over player inventory
     * Post-raid healing would often take money out of the players pockets/secure container
     * @param a First money stack item
     * @param b Second money stack item
     * @param inventoryItems players inventory items
     * @param playerStashId Players stash id
     * @returns sort order
     */
    protected prioritiseStashSort(a: Item, b: Item, inventoryItems: Item[], playerStashId: string): number;
    /**
     * Recursivly check items parents to see if it is inside the players inventory, not stash
     * @param itemId item id to check
     * @param inventoryItems player inventory
     * @param playerStashId Players stash id
     * @returns true if its in inventory
     */
    protected isInStash(itemId: string, inventoryItems: Item[], playerStashId: string): boolean;
}
