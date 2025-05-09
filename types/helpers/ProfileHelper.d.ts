import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, ICounterKeyValue, IStats } from "@spt/models/eft/common/tables/IBotBase";
import { CustomisationSource } from "@spt/models/eft/common/tables/ICustomisationStorage";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IReward } from "@spt/models/eft/common/tables/IReward";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import { ISpt, ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
import { BonusType } from "@spt/models/enums/BonusType";
import { SkillTypes } from "@spt/models/enums/SkillTypes";
import { IInventoryConfig } from "@spt/models/spt/config/IInventoryConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { Watermark } from "@spt/utils/Watermark";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ProfileHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected watermark: Watermark;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected inventoryConfig: IInventoryConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, watermark: Watermark, timeUtil: TimeUtil, saveServer: SaveServer, databaseService: DatabaseService, itemHelper: ItemHelper, localisationService: LocalisationService, configServer: ConfigServer, cloner: ICloner);
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
     * Sanitize any information from the profile that the client does not expect to receive
     * @param clonedProfile A clone of the full player profile
     */
    protected sanitizeProfileForClient(clonedProfile: ISptProfile): void;
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
    getDefaultSptDataObject(): ISpt;
    /**
     * Get full representation of a players profile json
     * @param sessionID Profile id to get
     * @returns ISptProfile object
     */
    getFullProfile(sessionID: string): ISptProfile | undefined;
    /**
     * Get full representation of a players profile JSON by the account ID, or undefined if not found
     * @param accountId Account ID to find
     * @returns
     */
    getFullProfileByAccountId(accountID: string): ISptProfile | undefined;
    /**
     * Retrieve a ChatRoomMember formatted profile for the given session ID
     * @param sessionID The session ID to return the profile for
     * @returns
     */
    getChatRoomMemberFromSessionId(sessionID: string): ISearchFriendResponse | undefined;
    /**
     * Retrieve a ChatRoomMember formatted profile for the given PMC profile data
     * @param pmcProfile The PMC profile data to format into a ChatRoomMember structure
     * @returns
     */
    getChatRoomMemberFromPmcProfile(pmcProfile: IPmcData): ISearchFriendResponse;
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
    getDefaultCounters(): IStats;
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
    incrementStatCounter(counters: ICounterKeyValue[], keyToIncrement: string): void;
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
    /**
     * Iterate over all bonuses and sum up all bonuses of desired type in provided profile
     * @param pmcProfile Player profile
     * @param desiredBonus Bonus to sum up
     * @returns Summed bonus value or 0 if no bonus found
     */
    getBonusValueFromProfile(pmcProfile: IPmcData, desiredBonus: BonusType): number;
    playerIsFleaBanned(pmcProfile: IPmcData): boolean;
    hasAccessToRepeatableFreeRefreshSystem(pmcProfile: IPmcData): boolean;
    /**
     * Find a profiles "Pockets" item and replace its tpl with passed in value
     * @param pmcProfile Player profile
     * @param newPocketTpl New tpl to set profiles Pockets to
     */
    replaceProfilePocketTpl(pmcProfile: IPmcData, newPocketTpl: string): void;
    /**
     * Return all quest items current in the supplied profile
     * @param profile Profile to get quest items from
     * @returns Array of item objects
     */
    getQuestItemsInProfile(profile: IPmcData): IItem[];
    /**
     * Return a favorites array in the format expected by the getOtherProfile call
     * @param profile
     * @returns An array of IItem objects representing the favorited data
     */
    getOtherProfileFavorites(profile: IPmcData): IItem[];
    /**
     * Add the given number of extra repeatable quests for the given type of repeatable to the users profile
     * @param fullProfile Profile to add the extra repeatable to
     * @param repeatableId The ID of the type of repeatable to increase
     * @param value The number of extra repeatables to add
     */
    addExtraRepeatableQuest(fullProfile: ISptProfile, repeatableId: string, value: number): void;
    /**
     * Store a hideout customisation unlock inside a profile
     * @param fullProfile Profile to add unlock to
     * @param reward reward given to player with customisation data
     * @param source Source of reward, e.g. "unlockedInGame" for quests and "achievement" for achievements
     */
    addHideoutCustomisationUnlock(fullProfile: ISptProfile, reward: IReward, source: CustomisationSource): void;
}
