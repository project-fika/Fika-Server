import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { TradeHelper } from "@spt-aki/helpers/TradeHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
import { IProcessBaseTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBaseTradeRequestData";
import { IOfferRequest, IProcessRagfairTradeRequestData } from "@spt-aki/models/eft/trade/IProcessRagfairTradeRequestData";
import { ISellScavItemsToFenceRequestData } from "@spt-aki/models/eft/trade/ISellScavItemsToFenceRequestData";
import { Traders } from "@spt-aki/models/enums/Traders";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class TradeController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected eventOutputHolder: EventOutputHolder;
    protected tradeHelper: TradeHelper;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected traderHelper: TraderHelper;
    protected jsonUtil: JsonUtil;
    protected ragfairServer: RagfairServer;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    protected ragfairPriceService: RagfairPriceService;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected roubleTpl: string;
    protected ragfairConfig: IRagfairConfig;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, eventOutputHolder: EventOutputHolder, tradeHelper: TradeHelper, timeUtil: TimeUtil, randomUtil: RandomUtil, hashUtil: HashUtil, itemHelper: ItemHelper, profileHelper: ProfileHelper, traderHelper: TraderHelper, jsonUtil: JsonUtil, ragfairServer: RagfairServer, httpResponse: HttpResponseUtil, localisationService: LocalisationService, ragfairPriceService: RagfairPriceService, mailSendService: MailSendService, configServer: ConfigServer);
    /** Handle TradingConfirm event */
    confirmTrading(pmcData: IPmcData, request: IProcessBaseTradeRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RagFairBuyOffer event */
    confirmRagfairTrading(pmcData: IPmcData, request: IProcessRagfairTradeRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Buy an item off the flea sold by a trader
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param fleaOffer Offer being purchased
     * @param requestOffer request data from client
     * @param output Output to send back to client
     */
    protected buyTraderItemFromRagfair(sessionId: string, pmcData: IPmcData, fleaOffer: IRagfairOffer, requestOffer: IOfferRequest, output: IItemEventRouterResponse): void;
    /**
     * Buy an item off the flea sold by a PMC
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param fleaOffer Offer being purchased
     * @param requestOffer Request data from client
     * @param output Output to send back to client
     */
    protected buyPmcItemFromRagfair(sessionId: string, pmcData: IPmcData, fleaOffer: IRagfairOffer, requestOffer: IOfferRequest, output: IItemEventRouterResponse): void;
    /**
     * Does Player have necessary trader loyalty to purchase flea offer
     * @param sellerIsTrader is seller trader
     * @param fleaOffer FLea offer being bought
     * @param pmcData Player profile
     * @returns True if player can buy offer
     */
    protected playerLacksTraderLoyaltyLevelToBuyOffer(fleaOffer: IRagfairOffer, pmcData: IPmcData): boolean;
    /** Handle SellAllFromSavage event */
    sellScavItemsToFence(pmcData: IPmcData, request: ISellScavItemsToFenceRequestData, sessionId: string): IItemEventRouterResponse;
    /**
     * Send the specified rouble total to player as mail
     * @param sessionId Session id
     * @param trader Trader to sell items to
     * @param output IItemEventRouterResponse
     */
    protected mailMoneyToPlayer(sessionId: string, roublesToSend: number, trader: Traders): void;
    /**
     * Looks up an items children and gets total handbook price for them
     * @param parentItemId parent item that has children we want to sum price of
     * @param items All items (parent + children)
     * @param handbookPrices Prices of items from handbook
     * @param traderDetails Trader being sold to to perform buy category check against
     * @returns Rouble price
     */
    protected getPriceOfItemAndChildren(parentItemId: string, items: Item[], handbookPrices: Record<string, number>, traderDetails: ITraderBase): number;
}
