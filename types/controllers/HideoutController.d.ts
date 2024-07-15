import { ScavCaseRewardGenerator } from "@spt/generators/ScavCaseRewardGenerator";
import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { HideoutArea, ITaskConditionCounter, Product } from "@spt/models/eft/common/tables/IBotBase";
import { HideoutUpgradeCompleteRequestData } from "@spt/models/eft/hideout/HideoutUpgradeCompleteRequestData";
import { IHandleQTEEventRequestData } from "@spt/models/eft/hideout/IHandleQTEEventRequestData";
import { IHideoutArea, Stage } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutCancelProductionRequestData } from "@spt/models/eft/hideout/IHideoutCancelProductionRequestData";
import { IHideoutContinuousProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutImproveAreaRequestData } from "@spt/models/eft/hideout/IHideoutImproveAreaRequestData";
import { IHideoutProduction } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutPutItemInRequestData } from "@spt/models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "@spt/models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "@spt/models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "@spt/models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "@spt/models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeRequestData } from "@spt/models/eft/hideout/IHideoutUpgradeRequestData";
import { IQteData } from "@spt/models/eft/hideout/IQteData";
import { IRecordShootingRangePoints } from "@spt/models/eft/hideout/IRecordShootingRangePoints";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { HideoutAreas } from "@spt/models/enums/HideoutAreas";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { PlayerService } from "@spt/services/PlayerService";
import { ProfileActivityService } from "@spt/services/ProfileActivityService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class HideoutController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected randomUtil: RandomUtil;
    protected inventoryHelper: InventoryHelper;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    protected playerService: PlayerService;
    protected presetHelper: PresetHelper;
    protected paymentHelper: PaymentHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected hideoutHelper: HideoutHelper;
    protected scavCaseRewardGenerator: ScavCaseRewardGenerator;
    protected localisationService: LocalisationService;
    protected profileActivityService: ProfileActivityService;
    protected configServer: ConfigServer;
    protected fenceService: FenceService;
    protected cloner: ICloner;
    /** Key used in TaskConditionCounters array */
    protected static nameTaskConditionCountersCrafting: string;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, databaseService: DatabaseService, randomUtil: RandomUtil, inventoryHelper: InventoryHelper, itemHelper: ItemHelper, saveServer: SaveServer, playerService: PlayerService, presetHelper: PresetHelper, paymentHelper: PaymentHelper, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, hideoutHelper: HideoutHelper, scavCaseRewardGenerator: ScavCaseRewardGenerator, localisationService: LocalisationService, profileActivityService: ProfileActivityService, configServer: ConfigServer, fenceService: FenceService, cloner: ICloner);
    /**
     * Handle HideoutUpgrade event
     * Start a hideout area upgrade
     * @param pmcData Player profile
     * @param request upgrade start request
     * @param sessionID Session id
     * @param output Client response
     */
    startUpgrade(pmcData: IPmcData, request: IHideoutUpgradeRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Handle HideoutUpgradeComplete event
     * Complete a hideout area upgrade
     * @param pmcData Player profile
     * @param request Completed upgrade request
     * @param sessionID Session id
     * @param output Client response
     */
    upgradeComplete(pmcData: IPmcData, request: HideoutUpgradeCompleteRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Upgrade wall status to visible in profile if medstation/water collector are both level 1
     * @param pmcData Player profile
     */
    protected checkAndUpgradeWall(pmcData: IPmcData): void;
    /**
     * @param pmcData Profile to edit
     * @param output Object to send back to client
     * @param sessionID Session/player id
     * @param profileParentHideoutArea Current hideout area for profile
     * @param dbHideoutArea Hideout area being upgraded
     * @param hideoutStage Stage hideout area is being upgraded to
     */
    protected addContainerImprovementToProfile(output: IItemEventRouterResponse, sessionID: string, pmcData: IPmcData, profileParentHideoutArea: HideoutArea, dbHideoutArea: IHideoutArea, hideoutStage: Stage): void;
    /**
     * Add an inventory item to profile from a hideout area stage data
     * @param pmcData Profile to update
     * @param dbHideoutData Hideout area from db being upgraded
     * @param hideoutStage Stage area upgraded to
     */
    protected addUpdateInventoryItemToProfile(pmcData: IPmcData, dbHideoutData: IHideoutArea, hideoutStage: Stage): void;
    /**
     * @param output Object to send to client
     * @param sessionID Session/player id
     * @param areaType Hideout area that had stash added
     * @param hideoutDbData Hideout area that caused addition of stash
     * @param hideoutStage Hideout area upgraded to this
     */
    protected addContainerUpgradeToClientOutput(output: IItemEventRouterResponse, sessionID: string, areaType: HideoutAreas, hideoutDbData: IHideoutArea, hideoutStage: Stage): void;
    /**
     * Handle HideoutPutItemsInAreaSlots
     * Create item in hideout slot item array, remove item from player inventory
     * @param pmcData Profile data
     * @param addItemToHideoutRequest reqeust from client to place item in area slot
     * @param sessionID Session id
     * @returns IItemEventRouterResponse object
     */
    putItemsInAreaSlots(pmcData: IPmcData, addItemToHideoutRequest: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeItemsFromAreaSlots event
     * Remove item from hideout area and place into player inventory
     * @param pmcData Player profile
     * @param request Take item out of area request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    takeItemsFromAreaSlots(pmcData: IPmcData, request: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Find resource item in hideout area, add copy to player inventory, remove Item from hideout slot
     * @param sessionID Session id
     * @param pmcData Profile to update
     * @param removeResourceRequest client request
     * @param output response to send to client
     * @param hideoutArea Area fuel is being removed from
     * @returns IItemEventRouterResponse response
     */
    protected removeResourceFromArea(sessionID: string, pmcData: IPmcData, removeResourceRequest: IHideoutTakeItemOutRequestData, output: IItemEventRouterResponse, hideoutArea: HideoutArea): IItemEventRouterResponse;
    /**
     * Handle HideoutToggleArea event
     * Toggle area on/off
     * @param pmcData Player profile
     * @param request Toggle area request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    toggleArea(pmcData: IPmcData, request: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutSingleProductionStart event
     * Start production for an item from hideout area
     * @param pmcData Player profile
     * @param body Start prodution of single item request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutScavCaseProductionStart event
     * Handles event after clicking 'start' on the scav case hideout page
     * @param pmcData player profile
     * @param body client request object
     * @param sessionID session id
     * @returns item event router response
     */
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Adjust scav case time based on fence standing
     *
     * @param pmcData Player profile
     * @param productionTime Time to complete scav case in seconds
     * @returns Adjusted scav case time in seconds
     */
    protected getScavCaseTime(pmcData: IPmcData, productionTime: number): number;
    /**
     * Add generated scav case rewards to player profile
     * @param pmcData player profile to add rewards to
     * @param rewards reward items to add to profile
     * @param recipeId recipe id to save into Production dict
     */
    protected addScavCaseRewardsToProfile(pmcData: IPmcData, rewards: Product[], recipeId: string): void;
    /**
     * Start production of continuously created item
     * @param pmcData Player profile
     * @param request Continious production request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    continuousProductionStart(pmcData: IPmcData, request: IHideoutContinuousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeProduction event
     * Take completed item out of hideout area and place into player inventory
     * @param pmcData Player profile
     * @param request Remove production from area request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    takeProduction(pmcData: IPmcData, request: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Take recipe-type production out of hideout area and place into player inventory
     * @param sessionID Session id
     * @param recipe Completed recipe of item
     * @param pmcData Player profile
     * @param request Remove production from area request
     * @param output Output object to update
     */
    protected handleRecipe(sessionID: string, recipe: IHideoutProduction, pmcData: IPmcData, request: IHideoutTakeProductionRequestData, output: IItemEventRouterResponse): void;
    /**
     * Get the "CounterHoursCrafting" TaskConditionCounter from a profile
     * @param pmcData Profile to get counter from
     * @param recipe Recipe being crafted
     * @returns ITaskConditionCounter
     */
    protected getHoursCraftingTaskConditionCounter(pmcData: IPmcData, recipe: IHideoutProduction): ITaskConditionCounter;
    /**
     * Handles generating case rewards and sending to player inventory
     * @param sessionID Session id
     * @param pmcData Player profile
     * @param request Get rewards from scavcase craft request
     * @param output Output object to update
     */
    protected handleScavCase(sessionID: string, pmcData: IPmcData, request: IHideoutTakeProductionRequestData, output: IItemEventRouterResponse): void;
    /**
     * Get quick time event list for hideout
     * // TODO - implement this
     * @param sessionId Session id
     * @returns IQteData array
     */
    getQteList(sessionId: string): IQteData[];
    /**
     * Handle HideoutQuickTimeEvent on client/game/profile/items/moving
     * Called after completing workout at gym
     * @param sessionId Session id
     * @param pmcData Profile to adjust
     * @param request QTE result object
     */
    handleQTEEventOutcome(sessionId: string, pmcData: IPmcData, request: IHandleQTEEventRequestData, output: IItemEventRouterResponse): void;
    /**
     * Record a high score from the shooting range into a player profiles overallcounters
     * @param sessionId Session id
     * @param pmcData Profile to update
     * @param request shooting range score request
     * @returns IItemEventRouterResponse
     */
    recordShootingRangePoints(sessionId: string, pmcData: IPmcData, request: IRecordShootingRangePoints): void;
    /**
     * Handle client/game/profile/items/moving - HideoutImproveArea
     * @param sessionId Session id
     * @param pmcData Profile to improve area in
     * @param request Improve area request data
     */
    improveArea(sessionId: string, pmcData: IPmcData, request: IHideoutImproveAreaRequestData): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving HideoutCancelProductionCommand
     * @param sessionId Session id
     * @param pmcData Profile with craft to cancel
     * @param request Cancel production request data
     * @returns IItemEventRouterResponse
     */
    cancelProduction(sessionId: string, pmcData: IPmcData, request: IHideoutCancelProductionRequestData): IItemEventRouterResponse;
    /**
     * Function called every x seconds as part of onUpdate event
     */
    update(): void;
}
