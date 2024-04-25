import { CustomizationCallbacks } from "@spt-aki/callbacks/CustomizationCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export declare class CustomizationItemEventRouter extends ItemEventRouterDefinition {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
