import { CustomizationController } from "@spt-aki/controllers/CustomizationController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { ISuit } from "@spt-aki/models/eft/common/tables/ITrader";
import { IBuyClothingRequestData } from "@spt-aki/models/eft/customization/IBuyClothingRequestData";
import { IGetSuitsResponse } from "@spt-aki/models/eft/customization/IGetSuitsResponse";
import { IWearClothingRequestData } from "@spt-aki/models/eft/customization/IWearClothingRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
}
