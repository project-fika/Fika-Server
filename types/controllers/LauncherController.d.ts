import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IChangeRequestData } from "@spt/models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "@spt/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt/models/eft/launcher/IRegisterData";
import { IConnectResponse } from "@spt/models/eft/profile/IConnectResponse";
import { IModDetails, Info } from "@spt/models/eft/profile/ISptProfile";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IPackageJsonData } from "@spt/models/spt/mod/IPackageJsonData";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class LauncherController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected saveServer: SaveServer;
    protected httpServerHelper: HttpServerHelper;
    protected profileHelper: ProfileHelper;
    protected databaseService: DatabaseService;
    protected localisationService: LocalisationService;
    protected preSptModLoader: PreSptModLoader;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, randomUtil: RandomUtil, saveServer: SaveServer, httpServerHelper: HttpServerHelper, profileHelper: ProfileHelper, databaseService: DatabaseService, localisationService: LocalisationService, preSptModLoader: PreSptModLoader, configServer: ConfigServer);
    connect(): IConnectResponse;
    /**
     * Get descriptive text for each of the profile edtions a player can choose, keyed by profile.json profile type e.g. "Edge Of Darkness"
     * @returns Dictionary of profile types with related descriptive text
     */
    protected getProfileDescriptions(): Record<string, string>;
    find(sessionId: string): Info;
    login(info: ILoginRequestData): string;
    register(info: IRegisterData): Promise<string>;
    protected createAccount(info: IRegisterData): Promise<string>;
    protected generateProfileId(): string;
    protected formatID(timeStamp: number, counter: number): string;
    changeUsername(info: IChangeRequestData): string;
    changePassword(info: IChangeRequestData): string;
    /**
     * Handle launcher requesting profile be wiped
     * @param info IRegisterData
     * @returns Session id
     */
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
    getServerModsProfileUsed(sessionId: string): IModDetails[];
}
