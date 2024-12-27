import { RagfairCallbacks } from "@spt/callbacks/RagfairCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export declare class RagfairItemEventRouter extends ItemEventRouterDefinition {
    protected ragfairCallbacks: RagfairCallbacks;
    constructor(ragfairCallbacks: RagfairCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): Promise<IItemEventRouterResponse>;
}
