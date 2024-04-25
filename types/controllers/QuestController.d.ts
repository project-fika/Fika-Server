import { DialogueHelper } from "@spt-aki/helpers/DialogueHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { QuestConditionHelper } from "@spt-aki/helpers/QuestConditionHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IQuestStatus } from "@spt-aki/models/eft/common/tables/IBotBase";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IQuest, IQuestCondition } from "@spt-aki/models/eft/common/tables/IQuest";
import { IRepeatableQuest } from "@spt-aki/models/eft/common/tables/IRepeatableQuests";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "@spt-aki/models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "@spt-aki/models/eft/quests/ICompleteQuestRequestData";
import { IFailQuestRequestData } from "@spt-aki/models/eft/quests/IFailQuestRequestData";
import { IHandoverQuestRequestData } from "@spt-aki/models/eft/quests/IHandoverQuestRequestData";
import { IQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocaleService } from "@spt-aki/services/LocaleService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { PlayerService } from "@spt-aki/services/PlayerService";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class QuestController {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected jsonUtil: JsonUtil;
    protected httpResponseUtil: HttpResponseUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected dialogueHelper: DialogueHelper;
    protected mailSendService: MailSendService;
    protected profileHelper: ProfileHelper;
    protected traderHelper: TraderHelper;
    protected questHelper: QuestHelper;
    protected questConditionHelper: QuestConditionHelper;
    protected playerService: PlayerService;
    protected localeService: LocaleService;
    protected seasonalEventService: SeasonalEventService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, jsonUtil: JsonUtil, httpResponseUtil: HttpResponseUtil, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, itemHelper: ItemHelper, dialogueHelper: DialogueHelper, mailSendService: MailSendService, profileHelper: ProfileHelper, traderHelper: TraderHelper, questHelper: QuestHelper, questConditionHelper: QuestConditionHelper, playerService: PlayerService, localeService: LocaleService, seasonalEventService: SeasonalEventService, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Handle client/quest/list
     * Get all quests visible to player
     * Exclude quests with incomplete preconditions (level/loyalty)
     * @param sessionID session id
     * @returns array of IQuest
     */
    getClientQuests(sessionID: string): IQuest[];
    /**
     * Does a provided quest have a level requirement equal to or below defined level
     * @param quest Quest to check
     * @param playerLevel level of player to test against quest
     * @returns true if quest can be seen/accepted by player of defined level
     */
    protected playerLevelFulfillsQuestRequirement(quest: IQuest, playerLevel: number): boolean;
    /**
     * Should a quest be shown to the player in trader quest screen
     * @param questId Quest to check
     * @returns true = show to player
     */
    protected showEventQuestToPlayer(questId: string): boolean;
    /**
     * Handle QuestAccept event
     * Handle the client accepting a quest and starting it
     * Send starting rewards if any to player and
     * Send start notification if any to player
     * @param pmcData Profile to update
     * @param acceptedQuest Quest accepted
     * @param sessionID Session id
     * @returns Client response
     */
    acceptQuest(pmcData: IPmcData, acceptedQuest: IAcceptQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle the client accepting a repeatable quest and starting it
     * Send starting rewards if any to player and
     * Send start notification if any to player
     * @param pmcData Profile to update with new quest
     * @param acceptedQuest Quest being accepted
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    acceptRepeatableQuest(pmcData: IPmcData, acceptedQuest: IAcceptQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Look for an accepted quest inside player profile, return matching
     * @param pmcData Profile to search through
     * @param acceptedQuest Quest to search for
     * @returns IRepeatableQuest
     */
    protected getRepeatableQuestFromProfile(pmcData: IPmcData, acceptedQuest: IAcceptQuestRequestData): IRepeatableQuest;
    /**
     * Handle QuestComplete event
     * Update completed quest in profile
     * Add newly unlocked quests to profile
     * Also recalculate their level due to exp rewards
     * @param pmcData Player profile
     * @param body Completed quest request
     * @param sessionID Session id
     * @returns ItemEvent client response
     */
    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Return a list of quests that would fail when supplied quest is completed
     * @param completedQuestId quest completed id
     * @returns array of IQuest objects
     */
    protected getQuestsFailedByCompletingQuest(completedQuestId: string, pmcProfile: IPmcData): IQuest[];
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
    protected getQuestsWithDifferentStatuses(preQuestStatusus: IQuestStatus[], postQuestStatuses: IQuestStatus[]): IQuestStatus[];
    /**
     * Send a popup to player on successful completion of a quest
     * @param sessionID session id
     * @param pmcData Player profile
     * @param completedQuestId Completed quest id
     * @param questRewards Rewards given to player
     */
    protected sendSuccessDialogMessageOnQuestComplete(sessionID: string, pmcData: IPmcData, completedQuestId: string, questRewards: Item[]): void;
    /**
     * Look for newly available quests after completing a quest with a requirement to wait x minutes (time-locked) before being available and add data to profile
     * @param pmcData Player profile to update
     * @param quests Quests to look for wait conditions in
     * @param completedQuestId Quest just completed
     */
    protected addTimeLockedQuestsToProfile(pmcData: IPmcData, quests: IQuest[], completedQuestId: string): void;
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
     * Handle QuestHandover event
     * @param pmcData Player profile
     * @param handoverQuestRequest handover item request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    handoverQuest(pmcData: IPmcData, handoverQuestRequest: IHandoverQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Show warning to user and write to log that repeatable quest failed a condition check
     * @param handoverQuestRequest Quest request
     * @param output Response to send to user
     * @returns IItemEventRouterResponse
     */
    protected showRepeatableQuestInvalidConditionError(handoverQuestRequest: IHandoverQuestRequestData, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Show warning to user and write to log quest item handed over did not match what is required
     * @param handoverQuestRequest Quest request
     * @param itemHandedOver Non-matching item found
     * @param handoverRequirements Quest handover requirements
     * @param output Response to send to user
     * @returns IItemEventRouterResponse
     */
    protected showQuestItemHandoverMatchError(handoverQuestRequest: IHandoverQuestRequestData, itemHandedOver: Item, handoverRequirements: IQuestCondition, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Increment a backend counter stored value by an amount,
     * Create counter if it does not exist
     * @param pmcData Profile to find backend counter in
     * @param conditionId backend counter id to update
     * @param questId quest id counter is associated with
     * @param counterValue value to increment the backend counter with
     */
    protected updateProfileTaskConditionCounterValue(pmcData: IPmcData, conditionId: string, questId: string, counterValue: number): void;
    /**
     * Handle /client/game/profile/items/moving - QuestFail
     * @param pmcData Pmc profile
     * @param request Fail qeust request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    failQuest(pmcData: IPmcData, request: IFailQuestRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
}
