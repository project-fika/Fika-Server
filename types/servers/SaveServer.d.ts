import { SaveLoadRouter } from "@spt/di/Router";
import { ISptProfile, Info } from "@spt/models/eft/profile/ISptProfile";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { FileSystem } from "@spt/utils/FileSystem";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { MutexInterface } from "async-mutex";
export declare class SaveServer {
    protected fileSystem: FileSystem;
    protected saveLoadRouters: SaveLoadRouter[];
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected localisationService: LocalisationService;
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected profileFilepath: string;
    protected profiles: Map<string, ISptProfile>;
    protected profilesBeingSavedMutex: Map<string, MutexInterface>;
    protected onBeforeSaveCallbacks: Map<string, (profile: ISptProfile) => Promise<ISptProfile>>;
    protected saveSHA1: {
        [key: string]: string;
    };
    constructor(fileSystem: FileSystem, saveLoadRouters: SaveLoadRouter[], jsonUtil: JsonUtil, hashUtil: HashUtil, localisationService: LocalisationService, logger: ILogger, configServer: ConfigServer);
    /**
     * Add callback to occur prior to saving profile changes
     * @param id Id for save callback
     * @param callback Callback to execute prior to running SaveServer.saveProfile()
     */
    addBeforeSaveCallback(id: string, callback: (profile: ISptProfile) => Promise<ISptProfile>): void;
    /**
     * Remove a callback from being executed prior to saving profile in SaveServer.saveProfile()
     * @param id Id of callback to remove
     */
    removeBeforeSaveCallback(id: string): void;
    /**
     * Load all profiles in /user/profiles folder into memory (this.profiles)
     * @returns A promise that resolves when loading all profiles is completed.
     */
    load(): Promise<void>;
    /**
     * Save changes for each profile from memory into user/profiles json
     * @returns A promise that resolves when saving all profiles is completed.
     */
    save(): Promise<void>;
    /**
     * Get a player profile from memory
     * @param sessionId Session id
     * @returns ISptProfile
     */
    getProfile(sessionId: string): ISptProfile;
    profileExists(id: string): boolean;
    /**
     * Gets all profiles from memory
     * @returns Dictionary of ISptProfile
     */
    getProfiles(): Record<string, ISptProfile>;
    /**
     * Delete a profile by id (Does not remove the profile file!)
     * @param sessionID Id of profile to remove
     * @returns true when deleted, false when profile not found
     */
    deleteProfileById(sessionID: string): boolean;
    /**
     * Create a new profile in memory with empty pmc/scav objects
     * @param profileInfo Basic profile data
     */
    createProfile(profileInfo: Info): void;
    /**
     * Add full profile in memory by key (info.id)
     * @param profileDetails Profile to save
     */
    addProfile(profileDetails: ISptProfile): void;
    /**
     * Look up profile json in user/profiles by id and store in memory
     * Execute saveLoadRouters callbacks after being loaded into memory
     * @param sessionID Id of profile to store in memory
     * @returns A promise that resolves when loading is completed.
     */
    loadProfile(sessionID: string): Promise<void>;
    /**
     * Save changes from in-memory profile to user/profiles json
     * Execute onBeforeSaveCallbacks callbacks prior to being saved to json
     * @param sessionID profile id (user/profiles/id.json)
     * @returns A promise that resolves when saving is completed.
     */
    saveProfile(sessionID: string): Promise<void>;
    /**
     * Remove a physical profile json from user/profiles
     * @param sessionID Profile id to remove
     * @returns A promise that is true if the file no longer exists
     */
    removeProfile(sessionID: string): Promise<boolean>;
}
