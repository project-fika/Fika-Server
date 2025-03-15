import { CustomizationController } from "@spt/controllers/CustomizationController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import type { ISuit } from "@spt/models/eft/common/tables/ITrader";
import type { IBuyClothingRequestData } from "@spt/models/eft/customization/IBuyClothingRequestData";
import type { ICustomizationSetRequest } from "@spt/models/eft/customization/ICustomizationSetRequest";
import type { IHideoutCustomisation } from "@spt/models/eft/hideout/IHideoutCustomisation";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class CustomizationCallbacks {
    protected customizationController: CustomizationController;
    protected saveServer: SaveServer;
    protected httpResponse: HttpResponseUtil;
    constructor(customizationController: CustomizationController, saveServer: SaveServer, httpResponse: HttpResponseUtil);
    /**
     * Handle client/trading/customization/storage
     * @returns IGetSuitsResponse
     */
    getCustomisationUnlocks(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICustomisationStorage[]>;
    /**
     * Handle client/trading/customization
     * @returns ISuit[]
     */
    getTraderSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISuit[]>;
    /**
     * Handle CustomizationBuy event
     */
    buyCustomisation(pmcData: IPmcData, body: IBuyClothingRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle client/hideout/customization/offer/list */
    getHideoutCustomisation(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutCustomisation>;
    /** Handle client/customization/storage */
    getStorage(url: string, request: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICustomisationStorage[]>;
    /** Handle CustomizationSet */
    setCustomisation(pmcData: IPmcData, request: ICustomizationSetRequest, sessionID: string): IItemEventRouterResponse;
}
