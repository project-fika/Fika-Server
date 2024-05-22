import { ItemEventRouterDefinition } from "@spt/di/Router";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IItemEventRouterRequest } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ItemEventRouter {
    protected logger: ILogger;
    protected profileHelper: ProfileHelper;
    protected itemEventRouters: ItemEventRouterDefinition[];
    protected localisationService: LocalisationService;
    protected eventOutputHolder: EventOutputHolder;
    protected cloner: ICloner;
    constructor(logger: ILogger, profileHelper: ProfileHelper, itemEventRouters: ItemEventRouterDefinition[], localisationService: LocalisationService, eventOutputHolder: EventOutputHolder, cloner: ICloner);
    /**
     * @param info Event request
     * @param sessionID Session id
     * @returns Item response
     */
    handleEvents(info: IItemEventRouterRequest, sessionID: string): Promise<IItemEventRouterResponse>;
}
