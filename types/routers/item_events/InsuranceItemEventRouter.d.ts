import { InsuranceCallbacks } from "@spt-aki/callbacks/InsuranceCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export declare class InsuranceItemEventRouter extends ItemEventRouterDefinition {
    protected insuranceCallbacks: InsuranceCallbacks;
    constructor(insuranceCallbacks: InsuranceCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
