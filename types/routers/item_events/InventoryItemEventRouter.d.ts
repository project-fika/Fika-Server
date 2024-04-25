import { HideoutCallbacks } from "@spt-aki/callbacks/HideoutCallbacks";
import { InventoryCallbacks } from "@spt-aki/callbacks/InventoryCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export declare class InventoryItemEventRouter extends ItemEventRouterDefinition {
    protected inventoryCallbacks: InventoryCallbacks;
    protected hideoutCallbacks: HideoutCallbacks;
    constructor(inventoryCallbacks: InventoryCallbacks, hideoutCallbacks: HideoutCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
}
