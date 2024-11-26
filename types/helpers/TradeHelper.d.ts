import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { TraderAssortHelper } from "@spt/helpers/TraderAssortHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessBuyTradeRequestData } from "@spt/models/eft/trade/IProcessBuyTradeRequestData";
import { IProcessSellTradeRequestData } from "@spt/models/eft/trade/IProcessSellTradeRequestData";
import { IInventoryConfig } from "@spt/models/spt/config/IInventoryConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RagfairServer } from "@spt/servers/RagfairServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { PaymentService } from "@spt/services/PaymentService";
import { TraderPurchasePersisterService } from "@spt/services/TraderPurchasePersisterService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class TradeHelper {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected eventOutputHolder: EventOutputHolder;
    protected traderHelper: TraderHelper;
    protected itemHelper: ItemHelper;
    protected paymentService: PaymentService;
    protected fenceService: FenceService;
    protected localisationService: LocalisationService;
    protected httpResponse: HttpResponseUtil;
    protected inventoryHelper: InventoryHelper;
    protected ragfairServer: RagfairServer;
    protected traderAssortHelper: TraderAssortHelper;
    protected traderPurchasePersisterService: TraderPurchasePersisterService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected traderConfig: ITraderConfig;
    protected inventoryConfig: IInventoryConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, eventOutputHolder: EventOutputHolder, traderHelper: TraderHelper, itemHelper: ItemHelper, paymentService: PaymentService, fenceService: FenceService, localisationService: LocalisationService, httpResponse: HttpResponseUtil, inventoryHelper: InventoryHelper, ragfairServer: RagfairServer, traderAssortHelper: TraderAssortHelper, traderPurchasePersisterService: TraderPurchasePersisterService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Buy item from flea or trader
     * @param pmcData Player profile
     * @param buyRequestData data from client
     * @param sessionID Session id
     * @param foundInRaid Should item be found in raid
     * @param output IItemEventRouterResponse
     * @returns IItemEventRouterResponse
     */
    buyItem(pmcData: IPmcData, buyRequestData: IProcessBuyTradeRequestData, sessionID: string, foundInRaid: boolean, output: IItemEventRouterResponse): void;
    /**
     * Sell item to trader
     * @param profileWithItemsToSell Profile to remove items from
     * @param profileToReceiveMoney Profile to accept the money for selling item
     * @param sellRequest Request data
     * @param sessionID Session id
     * @param output IItemEventRouterResponse
     */
    sellItem(profileWithItemsToSell: IPmcData, profileToReceiveMoney: IPmcData, sellRequest: IProcessSellTradeRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    protected incrementCirculateSoldToTraderCounter(profileWithItemsToSell: IPmcData, profileToReceiveMoney: IPmcData, sellRequest: IProcessSellTradeRequestData): void;
    /**
     * Traders allow a limited number of purchases per refresh cycle (default 60 mins)
     * @param sessionId Session id
     * @param pmcData Profile making the purchase
     * @param traderId Trader assort is purchased from
     * @param assortBeingPurchased the item from trader being bought
     * @param assortId Id of assort being purchased
     * @param count How many of the item are being bought
     */
    protected checkPurchaseIsWithinTraderItemLimit(sessionId: string, pmcData: IPmcData, traderId: string, assortBeingPurchased: IItem, assortId: string, count: number): void;
}
