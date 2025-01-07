import { BuildController } from "@spt/controllers/BuildController";
import { ISetMagazineRequest } from "@spt/models/eft/builds/ISetMagazineRequest";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IPresetBuildActionRequestData } from "@spt/models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "@spt/models/eft/presetBuild/IRemoveBuildRequestData";
import { IUserBuilds } from "@spt/models/eft/profile/ISptProfile";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class BuildsCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected buildController: BuildController;
    constructor(httpResponse: HttpResponseUtil, buildController: BuildController);
    /**
     * Handle client/builds/list
     */
    getBuilds(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IUserBuilds>;
    /**
     * Handle client/builds/magazine/save
     */
    createMagazineTemplate(url: string, request: ISetMagazineRequest, sessionID: string): INullResponseData;
    /**
     * Handle client/builds/weapon/save
     */
    setWeapon(url: string, info: IPresetBuildActionRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/builds/equipment/save
     */
    setEquipment(url: string, info: IPresetBuildActionRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/builds/delete
     */
    deleteBuild(url: string, info: IRemoveBuildRequestData, sessionID: string): INullResponseData;
}
