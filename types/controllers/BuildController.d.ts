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
import { ICloner } from "@spt-aki/utils/cloners/ICloner";
import { HashUtil } from "@spt-aki/utils/HashUtil";
export declare class BuildController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected profileHelper: ProfileHelper;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, profileHelper: ProfileHelper, itemHelper: ItemHelper, saveServer: SaveServer, cloner: ICloner);
    /** Handle client/handbook/builds/my/list */
    getUserBuilds(sessionID: string): IUserBuilds;
    /** Handle client/builds/weapon/save */
    saveWeaponBuild(sessionId: string, body: IPresetBuildActionRequestData): void;
    /** Handle client/builds/equipment/save event */
    saveEquipmentBuild(sessionID: string, request: IPresetBuildActionRequestData): void;
    /** Handle client/builds/delete */
    removeBuild(sessionID: string, request: IRemoveBuildRequestData): void;
    protected removePlayerBuild(idToRemove: string, sessionID: string): void;
    /**
     * Handle client/builds/magazine/save
     */
    createMagazineTemplate(sessionId: string, request: ISetMagazineRequest): void;
}
