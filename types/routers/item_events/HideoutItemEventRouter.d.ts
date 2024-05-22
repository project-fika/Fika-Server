import { HideoutCallbacks } from "@spt/callbacks/HideoutCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export declare class HideoutItemEventRouter extends ItemEventRouterDefinition {
    protected hideoutCallbacks: HideoutCallbacks;
    constructor(hideoutCallbacks: HideoutCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string, output: IItemEventRouterResponse): Promise<IItemEventRouterResponse>;
}
