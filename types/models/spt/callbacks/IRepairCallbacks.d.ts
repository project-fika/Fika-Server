import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt/models/eft/repair/ITraderRepairActionDataRequest";
export interface IRepairCallbacks {
    traderRepair(pmcData: IPmcData, body: ITraderRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
    repair(pmcData: IPmcData, body: IRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
}
