import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { Warning } from "@spt-aki/models/eft/itemEvent/IItemEventRouterBase";
import { IItemEventRouterRequest } from "@spt-aki/models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { ItemEventRouter } from "@spt-aki/routers/ItemEventRouter";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class ItemEventCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected itemEventRouter: ItemEventRouter;
    constructor(httpResponse: HttpResponseUtil, itemEventRouter: ItemEventRouter);
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): IGetBodyResponseData<IItemEventRouterResponse>;
    /**
     * Return true if the passed in list of warnings contains critical issues
     * @param warnings The list of warnings to check for critical errors
     * @returns
     */
    private isCriticalError;
    protected getErrorCode(warnings: Warning[]): number;
}
