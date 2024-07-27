import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestConditionHelper } from "@spt/helpers/QuestConditionHelper";
import { RagfairServerHelper } from "@spt/helpers/RagfairServerHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, IQuestStatus } from "@spt/models/eft/common/tables/IBotBase";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IQuest, IQuestCondition, IQuestReward } from "@spt/models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "@spt/models/eft/quests/IAcceptQuestRequestData";
import { IFailQuestRequestData } from "@spt/models/eft/quests/IFailQuestRequestData";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class QuestHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseService: DatabaseService;
    protected questConditionHelper: QuestConditionHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected localeService: LocaleService;
    protected ragfairServerHelper: RagfairServerHelper;
    protected dialogueHelper: DialogueHelper;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected seasonalEventService: SeasonalEventService;
    protected traderHelper: TraderHelper;
    protected presetHelper: PresetHelper;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, hashUtil: HashUtil, itemHelper: ItemHelper, databaseService: DatabaseService, questConditionHelper: QuestConditionHelper, eventOutputHolder: EventOutputHolder, localeService: LocaleService, ragfairServerHelper: RagfairServerHelper, dialogueHelper: DialogueHelper, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, seasonalEventService: SeasonalEventService, traderHelper: TraderHelper, presetHelper: PresetHelper, mailSendService: MailSendService, configServer: ConfigServer, cloner: ICloner);
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
     * Take reward item from quest and set FiR status + fix stack sizes + fix mod Ids
     * @param questReward Reward item to fix
     * @returns Fixed rewards
     */
    protected processReward(questReward: IQuestReward): Item[];
    /**
     * Add missing mod items to a quest armor reward
     * @param originalRewardRootItem Original armor reward item from IQuestReward.items object
     * @param questReward Armor reward from quest
     */
    protected generateArmorRewardChildSlots(originalRewardRootItem: Item, questReward: IQuestReward): void;
    /**
     * Gets a flat list of reward items for the given quest at a specific state (e.g. Fail/Success)
     * @param quest quest to get rewards for
     * @param status Quest status that holds the items (Started, Success, Fail)
     * @returns array of items with the correct maxStack
     */
    getQuestRewardItems(quest: IQuest, status: QuestStatus): Item[];
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
     * Get quests that can be shown to player after failing a quest
     * @param failedQuestId Id of the quest failed by player
     * @param sessionId Session id
     * @returns IQuest array
     */
    failedUnlocked(failedQuestId: string, sessionId: string): IQuest[];
    /**
     * Adjust quest money rewards by passed in multiplier
     * @param quest Quest to multiple money rewards
     * @param bonusPercent Value to adjust money rewards by
     * @param questStatus Status of quest to apply money boost to rewards of
     * @returns Updated quest
     */
    applyMoneyBoost(quest: IQuest, bonusPercent: number, questStatus: QuestStatus): IQuest;
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
    protected addItemStackSizeChangeIntoEventResponse(output: IItemEventRouterResponse, sessionId: string, item: Item): void;
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
     * Give player quest rewards - Skills/exp/trader standing/items/assort unlocks - Returns reward items player earned
     * @param profileData Player profile (scav or pmc)
     * @param questId questId of quest to get rewards for
     * @param state State of the quest to get rewards for
     * @param sessionId Session id
     * @param questResponse Response to send back to client
     * @returns Array of reward objects
     */
    applyQuestReward(profileData: IPmcData, questId: string, state: QuestStatus, sessionId: string, questResponse: IItemEventRouterResponse): Item[];
    /**
     * WIP - Find hideout craft id and add to unlockedProductionRecipe array in player profile
     * also update client response recipeUnlocked array with craft id
     * @param pmcData Player profile
     * @param craftUnlockReward Reward item from quest with craft unlock details
     * @param questDetails Quest with craft unlock reward
     * @param sessionID Session id
     * @param response Response to send back to client
     */
    protected findAndAddHideoutProductionIdToProfile(pmcData: IPmcData, craftUnlockReward: IQuestReward, questDetails: IQuest, sessionID: string, response: IItemEventRouterResponse): void;
    /**
     * Get players money reward bonus from profile
     * @param pmcData player profile
     * @returns bonus as a percent
     */
    protected getQuestMoneyRewardBonus(pmcData: IPmcData): number;
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
}
