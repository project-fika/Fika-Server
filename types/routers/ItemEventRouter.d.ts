import { ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IItemEventRouterRequest } from "@spt-aki/models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class ItemEventRouter {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected profileHelper: ProfileHelper;
    protected itemEventRouters: ItemEventRouterDefinition[];
    protected localisationService: LocalisationService;
    protected eventOutputHolder: EventOutputHolder;
    constructor(logger: ILogger, jsonUtil: JsonUtil, profileHelper: ProfileHelper, itemEventRouters: ItemEventRouterDefinition[], localisationService: LocalisationService, eventOutputHolder: EventOutputHolder);
    /**
     * @param info Event request
     * @param sessionID Session id
     * @returns Item response
     */
    handleEvents(info: IItemEventRouterRequest, sessionID: string): IItemEventRouterResponse;
}
