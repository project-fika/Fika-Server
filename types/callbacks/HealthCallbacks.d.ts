import { HealthController } from "@spt-aki/controllers/HealthController";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IHealthTreatmentRequestData } from "@spt-aki/models/eft/health/IHealthTreatmentRequestData";
import { IOffraidEatRequestData } from "@spt-aki/models/eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "@spt-aki/models/eft/health/IOffraidHealRequestData";
import { ISyncHealthRequestData } from "@spt-aki/models/eft/health/ISyncHealthRequestData";
import { IWorkoutData } from "@spt-aki/models/eft/health/IWorkoutData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class HealthCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected healthController: HealthController;
    constructor(httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, healthController: HealthController);
    /**
     * Custom aki server request found in modules/HealthSynchronizer.cs
     * @param url
     * @param info HealthListener.Instance.CurrentHealth class
     * @param sessionID session id
     * @returns empty response, no data sent back to client
     */
    syncHealth(url: string, info: ISyncHealthRequestData, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Custom aki server request found in modules/QTEPatch.cs
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
