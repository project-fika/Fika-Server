import { InsuranceController } from "@spt-aki/controllers/InsuranceController";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IGetInsuranceCostRequestData } from "@spt-aki/models/eft/insurance/IGetInsuranceCostRequestData";
import { IGetInsuranceCostResponseData } from "@spt-aki/models/eft/insurance/IGetInsuranceCostResponseData";
import { IInsureRequestData } from "@spt-aki/models/eft/insurance/IInsureRequestData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { InsuranceService } from "@spt-aki/services/InsuranceService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class InsuranceCallbacks implements OnUpdate {
    protected insuranceController: InsuranceController;
    protected insuranceService: InsuranceService;
    protected httpResponse: HttpResponseUtil;
    protected configServer: ConfigServer;
    protected insuranceConfig: IInsuranceConfig;
    constructor(insuranceController: InsuranceController, insuranceService: InsuranceService, httpResponse: HttpResponseUtil, configServer: ConfigServer);
    /**
     * Handle client/insurance/items/list/cost
     * @returns IGetInsuranceCostResponseData
     */
    getInsuranceCost(url: string, info: IGetInsuranceCostRequestData, sessionID: string): IGetBodyResponseData<IGetInsuranceCostResponseData>;
    /**
     * Handle Insure event
     * @returns IItemEventRouterResponse
     */
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): IItemEventRouterResponse;
    onUpdate(secondsSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
