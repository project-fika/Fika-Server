import { HideoutController } from "@spt-aki/controllers/HideoutController";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IHandleQTEEventRequestData } from "@spt-aki/models/eft/hideout/IHandleQTEEventRequestData";
import { IHideoutCancelProductionRequestData } from "@spt-aki/models/eft/hideout/IHideoutCancelProductionRequestData";
import { IHideoutContinuousProductionStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutImproveAreaRequestData } from "@spt-aki/models/eft/hideout/IHideoutImproveAreaRequestData";
import { IHideoutPutItemInRequestData } from "@spt-aki/models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "@spt-aki/models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "@spt-aki/models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "@spt-aki/models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeCompleteRequestData } from "@spt-aki/models/eft/hideout/IHideoutUpgradeCompleteRequestData";
import { IHideoutUpgradeRequestData } from "@spt-aki/models/eft/hideout/IHideoutUpgradeRequestData";
import { IRecordShootingRangePoints } from "@spt-aki/models/eft/hideout/IRecordShootingRangePoints";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
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
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
