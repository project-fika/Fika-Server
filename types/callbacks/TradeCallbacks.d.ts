import { TradeController } from "@spt/controllers/TradeController";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IProcessBaseTradeRequestData } from "@spt/models/eft/trade/IProcessBaseTradeRequestData";
import type { IProcessRagfairTradeRequestData } from "@spt/models/eft/trade/IProcessRagfairTradeRequestData";
import type { ISellScavItemsToFenceRequestData } from "@spt/models/eft/trade/ISellScavItemsToFenceRequestData";
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
