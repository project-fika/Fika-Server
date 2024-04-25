import { HealthHelper } from "@spt-aki/helpers/HealthHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IHealthTreatmentRequestData } from "@spt-aki/models/eft/health/IHealthTreatmentRequestData";
import { IOffraidEatRequestData } from "@spt-aki/models/eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "@spt-aki/models/eft/health/IOffraidHealRequestData";
import { ISyncHealthRequestData } from "@spt-aki/models/eft/health/ISyncHealthRequestData";
import { IWorkoutData } from "@spt-aki/models/eft/health/IWorkoutData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class HealthController {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected itemHelper: ItemHelper;
    protected paymentService: PaymentService;
    protected inventoryHelper: InventoryHelper;
    protected localisationService: LocalisationService;
    protected httpResponse: HttpResponseUtil;
    protected healthHelper: HealthHelper;
    constructor(logger: ILogger, jsonUtil: JsonUtil, eventOutputHolder: EventOutputHolder, itemHelper: ItemHelper, paymentService: PaymentService, inventoryHelper: InventoryHelper, localisationService: LocalisationService, httpResponse: HttpResponseUtil, healthHelper: HealthHelper);
    /**
     * stores in-raid player health
     * @param pmcData Player profile
     * @param info Request data
     * @param sessionID Player id
     * @param addEffects Should effects found be added or removed from profile
     * @param deleteExistingEffects Should all prior effects be removed before apply new ones
     */
    saveVitality(pmcData: IPmcData, info: ISyncHealthRequestData, sessionID: string, addEffects?: boolean, deleteExistingEffects?: boolean): void;
    /**
     * When healing in menu
     * @param pmcData Player profile
     * @param request Healing request
     * @param sessionID Player id
     * @returns IItemEventRouterResponse
     */
    offraidHeal(pmcData: IPmcData, request: IOffraidHealRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle Eat event
     * Consume food/water outside of a raid
     * @param pmcData Player profile
     * @param request Eat request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    offraidEat(pmcData: IPmcData, request: IOffraidEatRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle RestoreHealth event
     * Occurs on post-raid healing page
     * @param pmcData player profile
     * @param healthTreatmentRequest Request data from client
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    healthTreatment(pmcData: IPmcData, healthTreatmentRequest: IHealthTreatmentRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * applies skills from hideout workout.
     * @param pmcData Player profile
     * @param info Request data
     * @param sessionID
     */
    applyWorkoutChanges(pmcData: IPmcData, info: IWorkoutData, sessionId: string): void;
}
