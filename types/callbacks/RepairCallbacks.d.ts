import { RepairController } from "@spt-aki/controllers/RepairController";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt-aki/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt-aki/models/eft/repair/ITraderRepairActionDataRequest";
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
