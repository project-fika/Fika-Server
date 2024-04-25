import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IChangeRequestData } from "@spt-aki/models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt-aki/models/eft/launcher/IRegisterData";
import { Info, ModDetails } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IConnectResponse } from "@spt-aki/models/eft/profile/IConnectResponse";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { IPackageJsonData } from "@spt-aki/models/spt/mod/IPackageJsonData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class LauncherController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected saveServer: SaveServer;
    protected httpServerHelper: HttpServerHelper;
    protected profileHelper: ProfileHelper;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected preAkiModLoader: PreAkiModLoader;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, randomUtil: RandomUtil, saveServer: SaveServer, httpServerHelper: HttpServerHelper, profileHelper: ProfileHelper, databaseServer: DatabaseServer, localisationService: LocalisationService, preAkiModLoader: PreAkiModLoader, configServer: ConfigServer);
    connect(): IConnectResponse;
    /**
     * Get descriptive text for each of the profile edtions a player can choose, keyed by profile.json profile type e.g. "Edge Of Darkness"
     * @returns Dictionary of profile types with related descriptive text
     */
    protected getProfileDescriptions(): Record<string, string>;
    find(sessionIdKey: string): Info;
    login(info: ILoginRequestData): string;
    register(info: IRegisterData): string;
    protected createAccount(info: IRegisterData): string;
    protected generateProfileId(): string;
    protected formatID(timeStamp: number, counter: number): string;
    changeUsername(info: IChangeRequestData): string;
    changePassword(info: IChangeRequestData): string;
    wipe(info: IRegisterData): string;
    getCompatibleTarkovVersion(): string;
    /**
     * Get the mods the server has currently loaded
     * @returns Dictionary of mod name and mod details
     */
    getLoadedServerMods(): Record<string, IPackageJsonData>;
    /**
     * Get the mods a profile has ever loaded into game with
     * @param sessionId Player id
     * @returns Array of mod details
     */
    getServerModsProfileUsed(sessionId: string): ModDetails[];
}
