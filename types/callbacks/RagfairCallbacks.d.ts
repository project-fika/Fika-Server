import { RagfairController } from "@spt-aki/controllers/RagfairController";
import { OnLoad } from "@spt-aki/di/OnLoad";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IAddOfferRequestData } from "@spt-aki/models/eft/ragfair/IAddOfferRequestData";
import { IExtendOfferRequestData } from "@spt-aki/models/eft/ragfair/IExtendOfferRequestData";
import { IGetItemPriceResult } from "@spt-aki/models/eft/ragfair/IGetItemPriceResult";
import { IGetMarketPriceRequestData } from "@spt-aki/models/eft/ragfair/IGetMarketPriceRequestData";
import { IGetOffersResult } from "@spt-aki/models/eft/ragfair/IGetOffersResult";
import { IGetRagfairOfferByIdRequest } from "@spt-aki/models/eft/ragfair/IGetRagfairOfferByIdRequest";
import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
import { IRemoveOfferRequestData } from "@spt-aki/models/eft/ragfair/IRemoveOfferRequestData";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { ISendRagfairReportRequestData } from "@spt-aki/models/eft/ragfair/ISendRagfairReportRequestData";
import { IStorePlayerOfferTaxAmountRequestData } from "@spt-aki/models/eft/ragfair/IStorePlayerOfferTaxAmountRequestData";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";
import { RagfairTaxService } from "@spt-aki/services/RagfairTaxService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
/**
 * Handle ragfair related callback events
 */
export declare class RagfairCallbacks implements OnLoad, OnUpdate {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected ragfairServer: RagfairServer;
    protected ragfairController: RagfairController;
    protected ragfairTaxService: RagfairTaxService;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, ragfairServer: RagfairServer, ragfairController: RagfairController, ragfairTaxService: RagfairTaxService, configServer: ConfigServer);
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
