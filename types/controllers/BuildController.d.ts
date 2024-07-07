import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ISetMagazineRequest } from "@spt/models/eft/builds/ISetMagazineRequest";
import { IPresetBuildActionRequestData } from "@spt/models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "@spt/models/eft/presetBuild/IRemoveBuildRequestData";
import { IUserBuilds } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
export declare class BuildController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    protected localisationService: LocalisationService;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, databaseService: DatabaseService, profileHelper: ProfileHelper, localisationService: LocalisationService, itemHelper: ItemHelper, saveServer: SaveServer, cloner: ICloner);
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
