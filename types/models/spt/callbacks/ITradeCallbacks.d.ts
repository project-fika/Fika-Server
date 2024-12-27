import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IProcessBaseTradeRequestData } from "@spt/models/eft/trade/IProcessBaseTradeRequestData";
import type { IProcessRagfairTradeRequestData } from "@spt/models/eft/trade/IProcessRagfairTradeRequestData";
export interface ITradeCallbacks {
    processTrade(pmcData: IPmcData, body: IProcessBaseTradeRequestData, sessionID: string): IItemEventRouterResponse;
    processRagfairTrade(pmcData: IPmcData, body: IProcessRagfairTradeRequestData, sessionID: string): IItemEventRouterResponse;
}
