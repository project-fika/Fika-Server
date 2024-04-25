import { QuestCallbacks } from "@spt-aki/callbacks/QuestCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
export declare class QuestItemEventRouter extends ItemEventRouterDefinition {
    protected logger: ILogger;
    protected questCallbacks: QuestCallbacks;
    constructor(logger: ILogger, questCallbacks: QuestCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(eventAction: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
