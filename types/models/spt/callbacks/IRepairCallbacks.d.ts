import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt-aki/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt-aki/models/eft/repair/ITraderRepairActionDataRequest";
export interface IRepairCallbacks {
    traderRepair(pmcData: IPmcData, body: ITraderRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
    repair(pmcData: IPmcData, body: IRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
}
