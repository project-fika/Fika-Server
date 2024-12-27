import { HideoutCallbacks } from "@spt/callbacks/HideoutCallbacks";
import type { InventoryCallbacks } from "@spt/callbacks/InventoryCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export declare class InventoryItemEventRouter extends ItemEventRouterDefinition {
    protected inventoryCallbacks: InventoryCallbacks;
    protected hideoutCallbacks: HideoutCallbacks;
    constructor(inventoryCallbacks: InventoryCallbacks, hideoutCallbacks: HideoutCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string, output: IItemEventRouterResponse): Promise<IItemEventRouterResponse>;
}
