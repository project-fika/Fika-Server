import { CustomizationController } from "@spt/controllers/CustomizationController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { ISuit } from "@spt/models/eft/common/tables/ITrader";
import type { IBuyClothingRequestData } from "@spt/models/eft/customization/IBuyClothingRequestData";
import type { IGetSuitsResponse } from "@spt/models/eft/customization/IGetSuitsResponse";
import type { IWearClothingRequestData } from "@spt/models/eft/customization/IWearClothingRequestData";
import type { ICustomizationSetRequest } from "@spt/models/eft/customization/iCustomizationSetRequest";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import type { ICustomisationStorage } from "../models/eft/common/tables/ICustomisationStorage";
export declare class CustomizationCallbacks {
    protected customizationController: CustomizationController;
    protected saveServer: SaveServer;
    protected httpResponse: HttpResponseUtil;
    constructor(customizationController: CustomizationController, saveServer: SaveServer, httpResponse: HttpResponseUtil);
    /**
     * Handle client/trading/customization/storage
     * @returns IGetSuitsResponse
     */
    getSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetSuitsResponse>;
    /**
     * Handle client/trading/customization
     * @returns ISuit[]
     */
    getTraderSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISuit[]>;
    /**
     * Handle CustomizationWear event
     */
    wearClothing(pmcData: IPmcData, body: IWearClothingRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle CustomizationBuy event
     */
    buyClothing(pmcData: IPmcData, body: IBuyClothingRequestData, sessionID: string): IItemEventRouterResponse;
    getHideoutCustomisation(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    getStorage(url: string, info: any, sessionID: string): IGetBodyResponseData<ICustomisationStorage>;
    /** Handle CustomizationSet */
    setClothing(pmcData: IPmcData, info: ICustomizationSetRequest, sessionID: string): IGetBodyResponseData<any>;
}
