import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, CounterKeyValue, Stats } from "@spt/models/eft/common/tables/IBotBase";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
import { SkillTypes } from "@spt/models/enums/SkillTypes";
import { IInventoryConfig } from "@spt/models/spt/config/IInventoryConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ProfileSnapshotService } from "@spt/services/ProfileSnapshotService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { Watermark } from "@spt/utils/Watermark";
export declare class ProfileHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected watermark: Watermark;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected profileSnapshotService: ProfileSnapshotService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected inventoryConfig: IInventoryConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, watermark: Watermark, timeUtil: TimeUtil, saveServer: SaveServer, databaseService: DatabaseService, itemHelper: ItemHelper, profileSnapshotService: ProfileSnapshotService, localisationService: LocalisationService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Remove/reset a completed quest condtion from players profile quest data
     * @param sessionID Session id
     * @param questConditionId Quest with condition to remove
     */
    removeQuestConditionFromProfile(pmcData: IPmcData, questConditionId: Record<string, string>): void;
    /**
     * Get all profiles from server
     * @returns Dictionary of profiles
     */
    getProfiles(): Record<string, ISptProfile>;
    /**
     * Get the pmc and scav profiles as an array by profile id
     * @param sessionId
     * @returns Array of IPmcData objects
     */
    getCompleteProfile(sessionId: string): IPmcData[];
    /**
     * Fix xp doubling on post-raid xp reward screen by sending a 'dummy' profile to the post-raid screen
     * Server saves the post-raid changes prior to the xp screen getting the profile, this results in the xp screen using
     * the now updated profile values as a base, meaning it shows x2 xp gained
     * Instead, clone the post-raid profile (so we dont alter its values), apply the pre-raid xp values to the cloned objects and return
     * Delete snapshot of pre-raid profile prior to returning profile data
     * @param sessionId Session id
     * @param output pmc and scav profiles array
     * @param pmcProfile post-raid pmc profile
     * @param scavProfile post-raid scav profile
     * @returns Updated profile array
     */
    protected postRaidXpWorkaroundFix(sessionId: string, pmcProfile: IPmcData, scavProfile: IPmcData, output: IPmcData[]): IPmcData[];
    /**
     * Check if a nickname is used by another profile loaded by the server
     * @param nicknameRequest nickname request object
     * @param sessionID Session id
     * @returns True if already in use
     */
    isNicknameTaken(nicknameRequest: IValidateNicknameRequestData, sessionID: string): boolean;
    protected profileHasInfoProperty(profile: ISptProfile): boolean;
    protected stringsMatch(stringA: string, stringB: string): boolean;
    /**
     * Add experience to a PMC inside the players profile
     * @param sessionID Session id
     * @param experienceToAdd Experience to add to PMC character
     */
    addExperienceToPmc(sessionID: string, experienceToAdd: number): void;
    /**
     * Iterate all profiles and find matching pmc profile by provided id
     * @param pmcId Profile id to find
     * @returns IPmcData
     */
    getProfileByPmcId(pmcId: string): IPmcData | undefined;
    /**
     * Get experience value for given level
     * @param level Level to get xp for
     * @returns Number of xp points for level
     */
    getExperience(level: number): number;
    /**
     * Get the max level a player can be
     * @returns Max level
     */
    getMaxLevel(): number;
    getDefaultSptDataObject(): any;
    /**
     * Get full representation of a players profile json
     * @param sessionID Profile id to get
     * @returns ISptProfile object
     */
    getFullProfile(sessionID: string): ISptProfile | undefined;
    /**
     * Get a PMC profile by its session id
     * @param sessionID Profile id to return
     * @returns IPmcData object
     */
    getPmcProfile(sessionID: string): IPmcData | undefined;
    /**
     * Is given user id a player
     * @param userId Id to validate
     * @returns True is a player
     */
    isPlayer(userId: string): boolean;
    /**
     * Get a full profiles scav-specific sub-profile
     * @param sessionID Profiles id
     * @returns IPmcData object
     */
    getScavProfile(sessionID: string): IPmcData;
    /**
     * Get baseline counter values for a fresh profile
     * @returns Default profile Stats object
     */
    getDefaultCounters(): Stats;
    /**
     * is this profile flagged for data removal
     * @param sessionID Profile id
     * @returns True if profile is to be wiped of data/progress
     */
    protected isWiped(sessionID: string): boolean;
    /**
     * Iterate over player profile inventory items and find the secure container and remove it
     * @param profile Profile to remove secure container from
     * @returns profile without secure container
     */
    removeSecureContainer(profile: IPmcData): IPmcData;
    /**
     *  Flag a profile as having received a gift
     * Store giftid in profile spt object
     * @param playerId Player to add gift flag to
     * @param giftId Gift player received
     * @param maxCount Limit of how many of this gift a player can have
     */
    flagGiftReceivedInProfile(playerId: string, giftId: string, maxCount: number): void;
    /**
     * Check if profile has recieved a gift by id
     * @param playerId Player profile to check for gift
     * @param giftId Gift to check for
     * @param maxGiftCount Max times gift can be given to player
     * @returns True if player has recieved gift previously
     */
    playerHasRecievedMaxNumberOfGift(playerId: string, giftId: string, maxGiftCount: number): boolean;
    /**
     * Find Stat in profile counters and increment by one
     * @param counters Counters to search for key
     * @param keyToIncrement Key
     */
    incrementStatCounter(counters: CounterKeyValue[], keyToIncrement: string): void;
    /**
     * Check if player has a skill at elite level
     * @param skillType Skill to check
     * @param pmcProfile Profile to find skill in
     * @returns True if player has skill at elite level
     */
    hasEliteSkillLevel(skillType: SkillTypes, pmcProfile: IPmcData): boolean;
    /**
     * Add points to a specific skill in player profile
     * @param skill Skill to add points to
     * @param pointsToAdd Points to add
     * @param pmcProfile Player profile with skill
     * @param useSkillProgressRateMultipler Skills are multiplied by a value in globals, default is off to maintain compatibility with legacy code
     * @returns
     */
    addSkillPointsToPlayer(pmcProfile: IPmcData, skill: SkillTypes, pointsToAdd: number, useSkillProgressRateMultipler?: boolean): void;
    /**
     * Get a speciic common skill from supplied profile
     * @param pmcData Player profile
     * @param skill Skill to look up and return value from
     * @returns Common skill object from desired profile
     */
    getSkillFromProfile(pmcData: IPmcData, skill: SkillTypes): Common;
    /**
     * Is the provided session id for a developer account
     * @param sessionID Profile id ot check
     * @returns True if account is developer
     */
    isDeveloperAccount(sessionID: string): boolean;
    /**
     * Add stash row bonus to profile or increments rows given count if it already exists
     * @param sessionId Profile id to give rows to
     * @param rowsToAdd How many rows to give profile
     */
    addStashRowsBonusToProfile(sessionId: string, rowsToAdd: number): void;
    playerIsFleaBanned(pmcProfile: IPmcData): boolean;
    /**
     * Add an achievement to player profile
     * @param pmcProfile Profile to add achievement to
     * @param achievementId Id of achievement to add
     */
    addAchievementToProfile(pmcProfile: IPmcData, achievementId: string): void;
    hasAccessToRepeatableFreeRefreshSystem(pmcProfile: IPmcData): boolean;
}
