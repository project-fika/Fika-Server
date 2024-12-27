import { HealthController } from "@spt/controllers/HealthController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IHealthTreatmentRequestData } from "@spt/models/eft/health/IHealthTreatmentRequestData";
import type { IOffraidEatRequestData } from "@spt/models/eft/health/IOffraidEatRequestData";
import type { IOffraidHealRequestData } from "@spt/models/eft/health/IOffraidHealRequestData";
import type { IWorkoutData } from "@spt/models/eft/health/IWorkoutData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class HealthCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected healthController: HealthController;
    constructor(httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, healthController: HealthController);
    /**
     * Custom spt server request found in modules/QTEPatch.cs
     * @param url
     * @param info HealthListener.Instance.CurrentHealth class
     * @param sessionID session id
     * @returns empty response, no data sent back to client
     */
    handleWorkoutEffects(url: string, info: IWorkoutData, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Handle Eat
     * @returns IItemEventRouterResponse
     */
    offraidEat(pmcData: IPmcData, body: IOffraidEatRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle Heal
     * @returns IItemEventRouterResponse
     */
    offraidHeal(pmcData: IPmcData, body: IOffraidHealRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle RestoreHealth
     * @returns IItemEventRouterResponse
     */
    healthTreatment(pmcData: IPmcData, info: IHealthTreatmentRequestData, sessionID: string): IItemEventRouterResponse;
}
