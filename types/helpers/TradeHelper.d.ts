import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { TraderAssortHelper } from "@spt-aki/helpers/TraderAssortHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessBuyTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBuyTradeRequestData";
import { IProcessSellTradeRequestData } from "@spt-aki/models/eft/trade/IProcessSellTradeRequestData";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";
import { FenceService } from "@spt-aki/services/FenceService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { TraderPurchasePersisterService } from "@spt-aki/services/TraderPurchasePersisterService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class TradeHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
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
    protected traderConfig: ITraderConfig;
    protected inventoryConfig: IInventoryConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, eventOutputHolder: EventOutputHolder, traderHelper: TraderHelper, itemHelper: ItemHelper, paymentService: PaymentService, fenceService: FenceService, localisationService: LocalisationService, httpResponse: HttpResponseUtil, inventoryHelper: InventoryHelper, ragfairServer: RagfairServer, traderAssortHelper: TraderAssortHelper, traderPurchasePersisterService: TraderPurchasePersisterService, configServer: ConfigServer);
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
    /**
     * Traders allow a limited number of purchases per refresh cycle (default 60 mins)
     * @param sessionId Session id
     * @param traderId Trader assort is purchased from
     * @param assortBeingPurchased the item from trader being bought
     * @param assortId Id of assort being purchased
     * @param count How many of the item are being bought
     */
    protected checkPurchaseIsWithinTraderItemLimit(sessionId: string, traderId: string, assortBeingPurchased: Item, assortId: string, count: number): void;
}
