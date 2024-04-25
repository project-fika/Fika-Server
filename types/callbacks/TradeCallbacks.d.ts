import { TradeController } from "@spt-aki/controllers/TradeController";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessBaseTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBaseTradeRequestData";
import { IProcessRagfairTradeRequestData } from "@spt-aki/models/eft/trade/IProcessRagfairTradeRequestData";
import { ISellScavItemsToFenceRequestData } from "@spt-aki/models/eft/trade/ISellScavItemsToFenceRequestData";
export declare class TradeCallbacks {
    protected tradeController: TradeController;
    constructor(tradeController: TradeController);
    /**
     * Handle client/game/profile/items/moving TradingConfirm event
     */
    processTrade(pmcData: IPmcData, body: IProcessBaseTradeRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RagFairBuyOffer event */
    processRagfairTrade(pmcData: IPmcData, body: IProcessRagfairTradeRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle SellAllFromSavage event */
    sellAllFromSavage(pmcData: IPmcData, body: ISellScavItemsToFenceRequestData, sessionID: string): IItemEventRouterResponse;
}
