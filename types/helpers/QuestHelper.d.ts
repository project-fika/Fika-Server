import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestConditionHelper } from "@spt/helpers/QuestConditionHelper";
import { QuestRewardHelper } from "@spt/helpers/QuestRewardHelper";
import { RewardHelper } from "@spt/helpers/RewardHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, IQuestStatus } from "@spt/models/eft/common/tables/IBotBase";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuest, IQuestCondition } from "@spt/models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "@spt/models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "@spt/models/eft/quests/ICompleteQuestRequestData";
import { IFailQuestRequestData } from "@spt/models/eft/quests/IFailQuestRequestData";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { PlayerService } from "@spt/services/PlayerService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class QuestHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseService: DatabaseService;
    protected questConditionHelper: QuestConditionHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected localeService: LocaleService;
    protected profileHelper: ProfileHelper;
    protected questRewardHelper: QuestRewardHelper;
    protected rewardHelper: RewardHelper;
    protected localisationService: LocalisationService;
    protected seasonalEventService: SeasonalEventService;
    protected traderHelper: TraderHelper;
    protected mailSendService: MailSendService;
    protected playerService: PlayerService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, hashUtil: HashUtil, itemHelper: ItemHelper, databaseService: DatabaseService, questConditionHelper: QuestConditionHelper, eventOutputHolder: EventOutputHolder, localeService: LocaleService, profileHelper: ProfileHelper, questRewardHelper: QuestRewardHelper, rewardHelper: RewardHelper, localisationService: LocalisationService, seasonalEventService: SeasonalEventService, traderHelper: TraderHelper, mailSendService: MailSendService, playerService: PlayerService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Get status of a quest in player profile by its id
     * @param pmcData Profile to search
     * @param questId Quest id to look up
     * @returns QuestStatus enum
     */
    getQuestStatus(pmcData: IPmcData, questId: string): QuestStatus;
    /**
     * returns true is the level condition is satisfied
     * @param playerLevel Players level
     * @param condition Quest condition
     * @returns true if player level is greater than or equal to quest
     */
    doesPlayerLevelFulfilCondition(playerLevel: number, condition: IQuestCondition): boolean;
    /**
     * Get the quests found in both arrays (inner join)
     * @param before Array of quests #1
     * @param after Array of quests #2
     * @returns Reduction of cartesian product between two quest arrays
     */
    getDeltaQuests(before: IQuest[], after: IQuest[]): IQuest[];
    /**
     * Adjust skill experience for low skill levels, mimicing the official client
     * @param profileSkill the skill experience is being added to
     * @param progressAmount the amount of experience being added to the skill
     * @returns the adjusted skill progress gain
     */
    adjustSkillExpForLowLevels(profileSkill: Common, progressAmount: number): number;
    /**
     * Get quest name by quest id
     * @param questId id to get
     * @returns
     */
    getQuestNameFromLocale(questId: string): string;
    /**
     * Check if trader has sufficient loyalty to fulfill quest requirement
     * @param questProperties Quest props
     * @param profile Player profile
     * @returns true if loyalty is high enough to fulfill quest requirement
     */
    traderLoyaltyLevelRequirementCheck(questProperties: IQuestCondition, profile: IPmcData): boolean;
    /**
     * Check if trader has sufficient standing to fulfill quest requirement
     * @param questProperties Quest props
     * @param profile Player profile
     * @returns true if standing is high enough to fulfill quest requirement
     */
    traderStandingRequirementCheck(questProperties: IQuestCondition, profile: IPmcData): boolean;
    protected compareAvailableForValues(current: number, required: number, compareMethod: string): boolean;
    /**
     * Look up quest in db by accepted quest id and construct a profile-ready object ready to store in profile
     * @param pmcData Player profile
     * @param newState State the new quest should be in when returned
     * @param acceptedQuest Details of accepted quest from client
     */
    getQuestReadyForProfile(pmcData: IPmcData, newState: QuestStatus, acceptedQuest: IAcceptQuestRequestData): IQuestStatus;
    /**
     * Get quests that can be shown to player after starting a quest
     * @param startedQuestId Quest started by player
     * @param sessionID Session id
     * @returns Quests accessible to player incuding newly unlocked quests now quest (startedQuestId) was started
     */
    getNewlyAccessibleQuestsWhenStartingQuest(startedQuestId: string, sessionID: string): IQuest[];
    /**
     * Should a seasonal/event quest be shown to the player
     * @param questId Quest to check
     * @returns true = show to player
     */
    showEventQuestToPlayer(questId: string): boolean;
    /**
     * Is the quest for the opposite side the player is on
     * @param playerSide Player side (usec/bear)
     * @param questId QuestId to check
     */
    questIsForOtherSide(playerSide: string, questId: string): boolean;
    /**
     * Is the provided quest prevented from being viewed by the provided game version
     * (Inclusive filter)
     * @param gameVersion Game version to check against
     * @param questId Quest id to check
     * @returns True Quest should not be visible to game version
     */
    protected questIsProfileBlacklisted(gameVersion: string, questId: string): boolean;
    /**
     * Is the provided quest able to be seen by the provided game version
     * (Exclusive filter)
     * @param gameVersion Game version to check against
     * @param questId Quest id to check
     * @returns True Quest should be visible to game version
     */
    protected questIsProfileWhitelisted(gameVersion: string, questId: string): boolean;
    /**
     * Get quests that can be shown to player after failing a quest
     * @param failedQuestId Id of the quest failed by player
     * @param sessionId Session id
     * @returns IQuest array
     */
    failedUnlocked(failedQuestId: string, sessionId: string): IQuest[];
    /**
     * Sets the item stack to new value, or delete the item if value <= 0
     * // TODO maybe merge this function and the one from customization
     * @param pmcData Profile
     * @param itemId id of item to adjust stack size of
     * @param newStackSize Stack size to adjust to
     * @param sessionID Session id
     * @param output ItemEvent router response
     */
    changeItemStack(pmcData: IPmcData, itemId: string, newStackSize: number, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Add item stack change object into output route event response
     * @param output Response to add item change event into
     * @param sessionId Session id
     * @param item Item that was adjusted
     */
    protected addItemStackSizeChangeIntoEventResponse(output: IItemEventRouterResponse, sessionId: string, item: IItem): void;
    /**
     * Get quests, strip all requirement conditions except level
     * @param quests quests to process
     * @returns quest array without conditions
     */
    protected getQuestsWithOnlyLevelRequirementStartCondition(quests: IQuest[]): IQuest[];
    /**
     * Remove all quest conditions except for level requirement
     * @param quest quest to clean
     * @returns reset IQuest object
     */
    getQuestWithOnlyLevelRequirementStartCondition(quest: IQuest): IQuest;
    /**
     * Fail a quest in a player profile
     * @param pmcData Player profile
     * @param failRequest Fail quest request data
     * @param sessionID Session id
     * @param output Client output
     */
    failQuest(pmcData: IPmcData, failRequest: IFailQuestRequestData, sessionID: string, output?: IItemEventRouterResponse): void;
    /**
     * Get List of All Quests from db
     * NOT CLONED
     * @returns Array of IQuest objects
     */
    getQuestsFromDb(): IQuest[];
    /**
     * Get quest by id from database (repeatables are stored in profile, check there if questId not found)
     * @param questId Id of quest to find
     * @param pmcData Player profile
     * @returns IQuest object
     */
    getQuestFromDb(questId: string, pmcData: IPmcData): IQuest;
    /**
     * Get a quests startedMessageText key from db, if no startedMessageText key found, use description key instead
     * @param startedMessageTextId startedMessageText property from IQuest
     * @param questDescriptionId description property from IQuest
     * @returns message id
     */
    getMessageIdForQuestStart(startedMessageTextId: string, questDescriptionId: string): string;
    /**
     * Get the locale Id from locale db for a quest message
     * @param questMessageId Quest message id to look up
     * @returns Locale Id from locale db
     */
    getQuestLocaleIdFromDb(questMessageId: string): string;
    /**
     * Alter a quests state + Add a record to its status timers object
     * @param pmcData Profile to update
     * @param newQuestState New state the quest should be in
     * @param questId Id of the quest to alter the status of
     */
    updateQuestState(pmcData: IPmcData, newQuestState: QuestStatus, questId: string): void;
    /**
     * Resets a quests values back to its chosen state
     * @param pmcData Profile to update
     * @param newQuestState New state the quest should be in
     * @param questId Id of the quest to alter the status of
     */
    resetQuestState(pmcData: IPmcData, newQuestState: QuestStatus, questId: string): void;
    /**
     * Find quest with 'findItem' condition that needs the item tpl be handed in
     * @param itemTpl item tpl to look for
     * @param questIds Quests to search through for the findItem condition
     * @returns quest id with 'FindItem' condition id
     */
    getFindItemConditionByQuestItem(itemTpl: string, questIds: string[], allQuests: IQuest[]): Record<string, string>;
    /**
     * Add all quests to a profile with the provided statuses
     * @param pmcProfile profile to update
     * @param statuses statuses quests should have
     */
    addAllQuestsToProfile(pmcProfile: IPmcData, statuses: QuestStatus[]): void;
    findAndRemoveQuestFromArrayIfExists(questId: string, quests: IQuestStatus[]): void;
    /**
     * Return a list of quests that would fail when supplied quest is completed
     * @param completedQuestId quest completed id
     * @returns array of IQuest objects
     */
    getQuestsFailedByCompletingQuest(completedQuestId: string): IQuest[];
    /**
     * Get the hours a mails items can be collected for by profile type
     * @param pmcData Profile to get hours for
     * @returns Hours item will be available for
     */
    getMailItemRedeemTimeHoursForProfile(pmcData: IPmcData): number;
    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle client/quest/list
     * Get all quests visible to player
     * Exclude quests with incomplete preconditions (level/loyalty)
     * @param sessionID session id
     * @returns array of IQuest
     */
    getClientQuests(sessionID: string): IQuest[];
    /**
     * Create a clone of the given quest array with the rewards updated to reflect the
     * given game version
     * @param quests List of quests to check
     * @param gameVersion Game version of the profile
     * @returns Array of IQuest objects with the rewards filtered correctly for the game version
     */
    protected updateQuestsForGameEdition(quests: IQuest[], gameVersion: string): IQuest[];
    /**
     * Return a list of quests that would fail when supplied quest is completed
     * @param completedQuestId Quest completed id
     * @returns Array of IQuest objects
     */
    protected getQuestsFromProfileFailedByCompletingQuest(completedQuestId: string, pmcProfile: IPmcData): IQuest[];
    /**
     * Fail the provided quests
     * Update quest in profile, otherwise add fresh quest object with failed status
     * @param sessionID session id
     * @param pmcData player profile
     * @param questsToFail quests to fail
     * @param output Client output
     */
    protected failQuests(sessionID: string, pmcData: IPmcData, questsToFail: IQuest[], output: IItemEventRouterResponse): void;
    /**
     * Send a popup to player on successful completion of a quest
     * @param sessionID session id
     * @param pmcData Player profile
     * @param completedQuestId Completed quest id
     * @param questRewards Rewards given to player
     */
    protected sendSuccessDialogMessageOnQuestComplete(sessionID: string, pmcData: IPmcData, completedQuestId: string, questRewards: IItem[]): void;
    /**
     * Look for newly available quests after completing a quest with a requirement to wait x minutes (time-locked) before being available and add data to profile
     * @param pmcData Player profile to update
     * @param quests Quests to look for wait conditions in
     * @param completedQuestId Quest just completed
     */
    protected addTimeLockedQuestsToProfile(pmcData: IPmcData, quests: IQuest[], completedQuestId: string): void;
    /**
     * Remove a quest entirely from a profile
     * @param sessionId Player id
     * @param questIdToRemove Qid of quest to remove
     */
    protected removeQuestFromScavProfile(sessionId: string, questIdToRemove: string): void;
    /**
     * Return quests that have different statuses
     * @param preQuestStatusus Quests before
     * @param postQuestStatuses Quests after
     * @returns QuestStatusChange array
     */
    protected getQuestsWithDifferentStatuses(preQuestStatusus: IQuestStatus[], postQuestStatuses: IQuestStatus[]): IQuestStatus[] | undefined;
    /**
     * Does a provided quest have a level requirement equal to or below defined level
     * @param quest Quest to check
     * @param playerLevel level of player to test against quest
     * @returns true if quest can be seen/accepted by player of defined level
     */
    protected playerLevelFulfillsQuestRequirement(quest: IQuest, playerLevel: number): boolean;
}
