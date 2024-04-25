import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { ISetMagazineRequest } from "@spt-aki/models/eft/builds/ISetMagazineRequest";
import { IPresetBuildActionRequestData } from "@spt-aki/models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "@spt-aki/models/eft/presetBuild/IRemoveBuildRequestData";
import { IUserBuilds } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class BuildController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected profileHelper: ProfileHelper;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    constructor(logger: ILogger, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, jsonUtil: JsonUtil, databaseServer: DatabaseServer, profileHelper: ProfileHelper, itemHelper: ItemHelper, saveServer: SaveServer);
    /** Handle client/handbook/builds/my/list */
    getUserBuilds(sessionID: string): IUserBuilds;
    /** Handle client/builds/weapon/save */
    saveWeaponBuild(sessionId: string, body: IPresetBuildActionRequestData): void;
    /** Handle client/builds/equipment/save event */
    saveEquipmentBuild(sessionID: string, request: IPresetBuildActionRequestData): void;
    /** Handle client/builds/delete*/
    removeBuild(sessionID: string, request: IRemoveBuildRequestData): void;
    protected removePlayerBuild(id: string, sessionID: string): void;
    /**
     * Handle client/builds/magazine/save
     */
    createMagazineTemplate(sessionId: string, request: ISetMagazineRequest): void;
}
