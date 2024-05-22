import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { Warning } from "@spt/models/eft/itemEvent/IItemEventRouterBase";
import { IItemEventRouterRequest } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ItemEventRouter } from "@spt/routers/ItemEventRouter";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class ItemEventCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected itemEventRouter: ItemEventRouter;
    constructor(httpResponse: HttpResponseUtil, itemEventRouter: ItemEventRouter);
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): Promise<IGetBodyResponseData<IItemEventRouterResponse>>;
    /**
     * Return true if the passed in list of warnings contains critical issues
     * @param warnings The list of warnings to check for critical errors
     * @returns
     */
    private isCriticalError;
    protected getErrorCode(warnings: Warning[]): number;
}
