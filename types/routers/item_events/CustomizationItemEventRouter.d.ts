import { CustomizationCallbacks } from "@spt/callbacks/CustomizationCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export declare class CustomizationItemEventRouter extends ItemEventRouterDefinition {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): Promise<IItemEventRouterResponse>;
}
