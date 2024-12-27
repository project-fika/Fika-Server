import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterRequest } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export interface IItemEventCallbacks {
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): IGetBodyResponseData<IItemEventRouterResponse>;
}
