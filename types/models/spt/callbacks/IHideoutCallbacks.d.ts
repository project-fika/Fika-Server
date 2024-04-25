import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IHideoutContinuousProductionStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutPutItemInRequestData } from "@spt-aki/models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "@spt-aki/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "@spt-aki/models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "@spt-aki/models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "@spt-aki/models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeCompleteRequestData } from "@spt-aki/models/eft/hideout/IHideoutUpgradeCompleteRequestData";
import { IHideoutUpgradeRequestData } from "@spt-aki/models/eft/hideout/IHideoutUpgradeRequestData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
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
