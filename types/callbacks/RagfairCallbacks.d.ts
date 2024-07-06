import { RagfairController } from "@spt/controllers/RagfairController";
import { OnLoad } from "@spt/di/OnLoad";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IAddOfferRequestData } from "@spt/models/eft/ragfair/IAddOfferRequestData";
import { IExtendOfferRequestData } from "@spt/models/eft/ragfair/IExtendOfferRequestData";
import { IGetItemPriceResult } from "@spt/models/eft/ragfair/IGetItemPriceResult";
import { IGetMarketPriceRequestData } from "@spt/models/eft/ragfair/IGetMarketPriceRequestData";
import { IGetOffersResult } from "@spt/models/eft/ragfair/IGetOffersResult";
import { IGetRagfairOfferByIdRequest } from "@spt/models/eft/ragfair/IGetRagfairOfferByIdRequest";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { IRemoveOfferRequestData } from "@spt/models/eft/ragfair/IRemoveOfferRequestData";
import { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
import { ISendRagfairReportRequestData } from "@spt/models/eft/ragfair/ISendRagfairReportRequestData";
import { IStorePlayerOfferTaxAmountRequestData } from "@spt/models/eft/ragfair/IStorePlayerOfferTaxAmountRequestData";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RagfairServer } from "@spt/servers/RagfairServer";
import { RagfairTaxService } from "@spt/services/RagfairTaxService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
/**
 * Handle ragfair related callback events
 */
export declare class RagfairCallbacks implements OnLoad, OnUpdate {
    protected httpResponse: HttpResponseUtil;
    protected ragfairServer: RagfairServer;
    protected ragfairController: RagfairController;
    protected ragfairTaxService: RagfairTaxService;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(httpResponse: HttpResponseUtil, ragfairServer: RagfairServer, ragfairController: RagfairController, ragfairTaxService: RagfairTaxService, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    /**
     * Handle client/ragfair/search
     * Handle client/ragfair/find
     */
    search(url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<IGetOffersResult>;
    /** Handle client/ragfair/itemMarketPrice */
    getMarketPrice(url: string, info: IGetMarketPriceRequestData, sessionID: string): IGetBodyResponseData<IGetItemPriceResult>;
    /** Handle RagFairAddOffer event */
    addOffer(pmcData: IPmcData, info: IAddOfferRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RagFairRemoveOffer event */
    removeOffer(pmcData: IPmcData, info: IRemoveOfferRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RagFairRenewOffer event */
    extendOffer(pmcData: IPmcData, info: IExtendOfferRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle /client/items/prices
     * Called when clicking an item to list on flea
     */
    getFleaPrices(url: string, request: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, number>>;
    /** Handle client/reports/ragfair/send */
    sendReport(url: string, info: ISendRagfairReportRequestData, sessionID: string): INullResponseData;
    storePlayerOfferTaxAmount(url: string, request: IStorePlayerOfferTaxAmountRequestData, sessionId: string): INullResponseData;
    /** Handle client/ragfair/offer/findbyid */
    getFleaOfferById(url: string, request: IGetRagfairOfferByIdRequest, sessionID: string): IGetBodyResponseData<IRagfairOffer>;
}
