import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterRequest } from "@spt-aki/models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export interface IItemEventCallbacks {
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): IGetBodyResponseData<IItemEventRouterResponse>;
}
