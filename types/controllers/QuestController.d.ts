import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestConditionHelper } from "@spt/helpers/QuestConditionHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuest, IQuestCondition } from "@spt/models/eft/common/tables/IQuest";
import { IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "@spt/models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "@spt/models/eft/quests/ICompleteQuestRequestData";
import { IFailQuestRequestData } from "@spt/models/eft/quests/IFailQuestRequestData";
import { IHandoverQuestRequestData } from "@spt/models/eft/quests/IHandoverQuestRequestData";
import { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { PlayerService } from "@spt/services/PlayerService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class QuestController {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected httpResponseUtil: HttpResponseUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected dialogueHelper: DialogueHelper;
    protected mailSendService: MailSendService;
    protected profileHelper: ProfileHelper;
    protected traderHelper: TraderHelper;
    protected questHelper: QuestHelper;
    protected questConditionHelper: QuestConditionHelper;
    protected playerService: PlayerService;
    protected localeService: LocaleService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, httpResponseUtil: HttpResponseUtil, eventOutputHolder: EventOutputHolder, databaseService: DatabaseService, itemHelper: ItemHelper, dialogueHelper: DialogueHelper, mailSendService: MailSendService, profileHelper: ProfileHelper, traderHelper: TraderHelper, questHelper: QuestHelper, questConditionHelper: QuestConditionHelper, playerService: PlayerService, localeService: LocaleService, localisationService: LocalisationService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Handle client/quest/list
     * Get all quests visible to player
     * Exclude quests with incomplete preconditions (level/loyalty)
     * @param sessionID session id
     * @returns array of IQuest
     */
    getClientQuests(sessionID: string): IQuest[];
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
     *
     * @param questConditions Conditions to iterate over and possibly add to profile
     * @param pmcData Profile to add to
     * @param questId Quest conditions came from
     */
    protected addTaskConditionCountersToProfile(questConditions: IQuestCondition[], pmcData: IPmcData, questId: string): void;
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
    protected createAcceptedQuestClientResponse(sessionID: string, pmcData: IPmcData, repeatableQuestProfile: IRepeatableQuest): IItemEventRouterResponse;
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
    protected showQuestItemHandoverMatchError(handoverQuestRequest: IHandoverQuestRequestData, itemHandedOver: IItem, handoverRequirements: IQuestCondition, output: IItemEventRouterResponse): IItemEventRouterResponse;
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
