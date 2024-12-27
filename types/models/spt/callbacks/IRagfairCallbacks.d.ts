import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IAddOfferRequestData } from "@spt/models/eft/ragfair/IAddOfferRequestData";
import type { IExtendOfferRequestData } from "@spt/models/eft/ragfair/IExtendOfferRequestData";
import type { IGetItemPriceResult } from "@spt/models/eft/ragfair/IGetItemPriceResult";
import type { IGetMarketPriceRequestData } from "@spt/models/eft/ragfair/IGetMarketPriceRequestData";
import type { IRemoveOfferRequestData } from "@spt/models/eft/ragfair/IRemoveOfferRequestData";
import type { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
export interface IRagfairCallbacks {
    load(): void;
    search(url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<any>;
    getMarketPrice(url: string, info: IGetMarketPriceRequestData, sessionID: string): IGetBodyResponseData<IGetItemPriceResult>;
    getItemPrices(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    addOffer(pmcData: IPmcData, info: IAddOfferRequestData, sessionID: string): IItemEventRouterResponse;
    removeOffer(pmcData: IPmcData, info: IRemoveOfferRequestData, sessionID: string): IItemEventRouterResponse;
    extendOffer(pmcData: IPmcData, info: IExtendOfferRequestData, sessionID: string): IItemEventRouterResponse;
    update(timeSinceLastRun: number): boolean;
    updatePlayer(timeSinceLastRun: number): boolean;
}
