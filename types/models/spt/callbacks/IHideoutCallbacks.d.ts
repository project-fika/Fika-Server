import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IHideoutContinuousProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import type { IHideoutPutItemInRequestData } from "@spt/models/eft/hideout/IHideoutPutItemInRequestData";
import type { IHideoutScavCaseStartRequestData } from "@spt/models/eft/hideout/IHideoutScavCaseStartRequestData";
import type { IHideoutSingleProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import type { IHideoutTakeItemOutRequestData } from "@spt/models/eft/hideout/IHideoutTakeItemOutRequestData";
import type { IHideoutTakeProductionRequestData } from "@spt/models/eft/hideout/IHideoutTakeProductionRequestData";
import type { IHideoutToggleAreaRequestData } from "@spt/models/eft/hideout/IHideoutToggleAreaRequestData";
import type { IHideoutUpgradeCompleteRequestData } from "@spt/models/eft/hideout/IHideoutUpgradeCompleteRequestData";
import type { IHideoutUpgradeRequestData } from "@spt/models/eft/hideout/IHideoutUpgradeRequestData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
export interface IHideoutCallbacks {
    upgrade(pmcData: IPmcData, body: IHideoutUpgradeRequestData, sessionID: string): IItemEventRouterResponse;
    upgradeComplete(pmcData: IPmcData, body: IHideoutUpgradeCompleteRequestData, sessionID: string): IItemEventRouterResponse;
    putItemsInAreaSlots(pmcData: IPmcData, body: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    takeItemsFromAreaSlots(pmcData: IPmcData, body: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    toggleArea(pmcData: IPmcData, body: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    continuousProductionStart(pmcData: IPmcData, body: IHideoutContinuousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    takeProduction(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    update(timeSinceLastRun: number): boolean;
}
