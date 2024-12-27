import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IPresetBuildActionRequestData } from "@spt/models/eft/presetBuild/IPresetBuildActionRequestData";
import type { IWeaponBuild } from "@spt/models/eft/profile/ISptProfile";
export interface IPresetBuildCallbacks {
    getHandbookUserlist(url: string, info: any, sessionID: string): IGetBodyResponseData<IWeaponBuild[]>;
    saveWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    removeWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    saveEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    removeEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
}
