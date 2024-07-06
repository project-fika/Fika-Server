import { RepairController } from "@spt/controllers/RepairController";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt/models/eft/repair/ITraderRepairActionDataRequest";
export declare class RepairCallbacks {
    protected repairController: RepairController;
    constructor(repairController: RepairController);
    /**
     * Handle TraderRepair event
     * use trader to repair item
     * @param pmcData Player profile
     * @param traderRepairRequest Request object
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    traderRepair(pmcData: IPmcData, traderRepairRequest: ITraderRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle Repair event
     * Use repair kit to repair item
     * @param pmcData Player profile
     * @param repairRequest Request object
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    repair(pmcData: IPmcData, repairRequest: IRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
}
