import type { InsuranceController } from "@spt/controllers/InsuranceController";
import type { OnUpdate } from "@spt/di/OnUpdate";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IGetInsuranceCostRequestData } from "@spt/models/eft/insurance/IGetInsuranceCostRequestData";
import type { IGetInsuranceCostResponseData } from "@spt/models/eft/insurance/IGetInsuranceCostResponseData";
import type { IInsureRequestData } from "@spt/models/eft/insurance/IInsureRequestData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import type { InsuranceService } from "@spt/services/InsuranceService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
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
