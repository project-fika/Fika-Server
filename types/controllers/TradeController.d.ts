import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RagfairOfferHelper } from "@spt/helpers/RagfairOfferHelper";
import { TradeHelper } from "@spt/helpers/TradeHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { IProcessBaseTradeRequestData } from "@spt/models/eft/trade/IProcessBaseTradeRequestData";
import { IOfferRequest, IProcessRagfairTradeRequestData } from "@spt/models/eft/trade/IProcessRagfairTradeRequestData";
import { ISellScavItemsToFenceRequestData } from "@spt/models/eft/trade/ISellScavItemsToFenceRequestData";
import { Traders } from "@spt/models/enums/Traders";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RagfairServer } from "@spt/servers/RagfairServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class TradeController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected eventOutputHolder: EventOutputHolder;
    protected tradeHelper: TradeHelper;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected ragfairOfferHelper: RagfairOfferHelper;
    protected traderHelper: TraderHelper;
    protected ragfairServer: RagfairServer;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    protected ragfairPriceService: RagfairPriceService;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, eventOutputHolder: EventOutputHolder, tradeHelper: TradeHelper, timeUtil: TimeUtil, randomUtil: RandomUtil, hashUtil: HashUtil, itemHelper: ItemHelper, profileHelper: ProfileHelper, ragfairOfferHelper: RagfairOfferHelper, traderHelper: TraderHelper, ragfairServer: RagfairServer, httpResponse: HttpResponseUtil, localisationService: LocalisationService, ragfairPriceService: RagfairPriceService, mailSendService: MailSendService, configServer: ConfigServer);
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
     * Is the provided offerid and ownerid from a player made offer
     * @param offerId Id of the offer
     * @param offerOwnerId Owner id
     * @returns true if offer was made by a player
     */
    protected isPlayerOffer(offerId: string, offerOwnerId: string): boolean;
    /**
     * Does Player have necessary trader loyalty to purchase flea offer
     * @param sellerIsTrader is seller trader
     * @param fleaOffer Flea offer being bought
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
    protected getPriceOfItemAndChildren(parentItemId: string, items: IItem[], handbookPrices: Record<string, number>, traderDetails: ITraderBase): number;
}
