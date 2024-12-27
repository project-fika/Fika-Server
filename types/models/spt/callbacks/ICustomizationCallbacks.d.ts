import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { ISuit } from "@spt/models/eft/common/tables/ITrader";
import type { IBuyClothingRequestData } from "@spt/models/eft/customization/IBuyClothingRequestData";
import type { IWearClothingRequestData } from "@spt/models/eft/customization/IWearClothingRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export interface ICustomizationCallbacks {
    getSuits(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    getTraderSuits(url: string, info: any, sessionID: string): IGetBodyResponseData<ISuit[]>;
    wearClothing(pmcData: IPmcData, body: IWearClothingRequestData, sessionID: string): IItemEventRouterResponse;
    buyClothing(pmcData: IPmcData, body: IBuyClothingRequestData, sessionID: string): IItemEventRouterResponse;
}
