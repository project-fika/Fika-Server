import { HideoutController } from "@spt/controllers/HideoutController";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IHandleQTEEventRequestData } from "@spt/models/eft/hideout/IHandleQTEEventRequestData";
import { IHideoutCancelProductionRequestData } from "@spt/models/eft/hideout/IHideoutCancelProductionRequestData";
import { IHideoutCircleOfCultistProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutCircleOfCultistProductionStartRequestData";
import { IHideoutContinuousProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutDeleteProductionRequestData } from "@spt/models/eft/hideout/IHideoutDeleteProductionRequestData";
import { IHideoutImproveAreaRequestData } from "@spt/models/eft/hideout/IHideoutImproveAreaRequestData";
import { IHideoutPutItemInRequestData } from "@spt/models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "@spt/models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "@spt/models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "@spt/models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "@spt/models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeCompleteRequestData } from "@spt/models/eft/hideout/IHideoutUpgradeCompleteRequestData";
import { IHideoutUpgradeRequestData } from "@spt/models/eft/hideout/IHideoutUpgradeRequestData";
import { IRecordShootingRangePoints } from "@spt/models/eft/hideout/IRecordShootingRangePoints";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
export declare class HideoutCallbacks implements OnUpdate {
    protected hideoutController: HideoutController;
    protected configServer: ConfigServer;
    protected hideoutConfig: IHideoutConfig;
    constructor(hideoutController: HideoutController, // TODO: delay needed
    configServer: ConfigServer);
    /**
     * Handle HideoutUpgrade event
     */
    upgrade(pmcData: IPmcData, body: IHideoutUpgradeRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handle HideoutUpgradeComplete event
     */
    upgradeComplete(pmcData: IPmcData, body: IHideoutUpgradeCompleteRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handle HideoutPutItemsInAreaSlots
     */
    putItemsInAreaSlots(pmcData: IPmcData, body: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeItemsFromAreaSlots event
     */
    takeItemsFromAreaSlots(pmcData: IPmcData, body: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutToggleArea event
     */
    toggleArea(pmcData: IPmcData, body: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutSingleProductionStart event
     */
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutScavCaseProductionStart event
     */
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutContinuousProductionStart
     */
    continuousProductionStart(pmcData: IPmcData, body: IHideoutContinuousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutTakeProduction event
     */
    takeProduction(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle HideoutQuickTimeEvent
     */
    handleQTEEvent(pmcData: IPmcData, request: IHandleQTEEventRequestData, sessionId: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - RecordShootingRangePoints
     */
    recordShootingRangePoints(pmcData: IPmcData, request: IRecordShootingRangePoints, sessionId: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - RecordShootingRangePoints
     */
    improveArea(pmcData: IPmcData, request: IHideoutImproveAreaRequestData, sessionId: string): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - HideoutCancelProductionCommand
     */
    cancelProduction(pmcData: IPmcData, request: IHideoutCancelProductionRequestData, sessionId: string): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - HideoutCircleOfCultistProductionStart
     */
    circleOfCultistProductionStart(pmcData: IPmcData, request: IHideoutCircleOfCultistProductionStartRequestData, sessionId: string): IItemEventRouterResponse;
    /**
     * Handle client/game/profile/items/moving - HideoutDeleteProductionCommand
     */
    hideoutDeleteProductionCommand(pmcData: IPmcData, request: IHideoutDeleteProductionRequestData, sessionId: string): IItemEventRouterResponse;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
