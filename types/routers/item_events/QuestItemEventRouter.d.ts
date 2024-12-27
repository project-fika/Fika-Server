import { QuestCallbacks } from "@spt/callbacks/QuestCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
export declare class QuestItemEventRouter extends ItemEventRouterDefinition {
    protected logger: ILogger;
    protected questCallbacks: QuestCallbacks;
    constructor(logger: ILogger, questCallbacks: QuestCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(eventAction: string, pmcData: IPmcData, body: any, sessionID: string): Promise<IItemEventRouterResponse>;
}
