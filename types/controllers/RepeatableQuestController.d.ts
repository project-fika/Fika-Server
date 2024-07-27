import { RepeatableQuestGenerator } from "@spt/generators/RepeatableQuestGenerator";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { RepeatableQuestHelper } from "@spt/helpers/RepeatableQuestHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IRepeatableQuestChangeRequest } from "@spt/models/eft/quests/IRepeatableQuestChangeRequest";
import { ELocationName } from "@spt/models/enums/ELocationName";
import { IQuestConfig, IRepeatableQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { IGetRepeatableByIdResult } from "@spt/models/spt/quests/IGetRepeatableByIdResult";
import { IQuestTypePool } from "@spt/models/spt/repeatable/IQuestTypePool";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { PaymentService } from "@spt/services/PaymentService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { ObjectId } from "@spt/utils/ObjectId";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RepeatableQuestController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected profileFixerService: ProfileFixerService;
    protected localisationService: LocalisationService;
    protected eventOutputHolder: EventOutputHolder;
    protected paymentService: PaymentService;
    protected objectId: ObjectId;
    protected repeatableQuestGenerator: RepeatableQuestGenerator;
    protected repeatableQuestHelper: RepeatableQuestHelper;
    protected questHelper: QuestHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, timeUtil: TimeUtil, randomUtil: RandomUtil, httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, eventOutputHolder: EventOutputHolder, paymentService: PaymentService, objectId: ObjectId, repeatableQuestGenerator: RepeatableQuestGenerator, repeatableQuestHelper: RepeatableQuestHelper, questHelper: QuestHelper, configServer: ConfigServer, cloner: ICloner);
    /**
     * Handle client/repeatalbeQuests/activityPeriods
     * Returns an array of objects in the format of repeatable quests to the client.
     * repeatableQuestObject = {
     *  id: Unique Id,
     *  name: "Daily",
     *  endTime: the time when the quests expire
     *  activeQuests: currently available quests in an array. Each element of quest type format (see assets/database/templates/repeatableQuests.json).
     *  inactiveQuests: the quests which were previously active (required by client to fail them if they are not completed)
     * }
     *
     * The method checks if the player level requirement for repeatable quests (e.g. daily lvl5, weekly lvl15) is met and if the previously active quests
     * are still valid. This ischecked by endTime persisted in profile accordning to the resetTime configured for each repeatable kind (daily, weekly)
     * in QuestCondig.js
     *
     * If the condition is met, new repeatableQuests are created, old quests (which are persisted in the profile.RepeatableQuests[i].activeQuests) are
     * moved to profile.RepeatableQuests[i].inactiveQuests. This memory is required to get rid of old repeatable quest data in the profile, otherwise
     * they'll litter the profile's Quests field.
     * (if the are on "Succeed" but not "Completed" we keep them, to allow the player to complete them and get the rewards)
     * The new quests generated are again persisted in profile.RepeatableQuests
     *
     * @param   {string}    sessionID   Player's session id
     *
     * @returns  {array}                Array of "repeatableQuestObjects" as described above
     */
    getClientRepeatableQuests(sessionID: string): IPmcDataRepeatableQuest[];
    /**
     * Expire quests and replace expired quests with ready-to-hand-in quests inside generatedRepeatables.activeQuests
     * @param generatedRepeatables Repeatables to process (daily/weekly)
     * @param pmcData Player profile
     */
    protected processExpiredQuests(generatedRepeatables: IPmcDataRepeatableQuest, pmcData: IPmcData): void;
    /**
     * Check if a repeatable quest type (daily/weekly) is active for the given profile
     * @param repeatableConfig Repeatable quest config
     * @param pmcData Player profile
     * @returns True if profile is allowed to access dailies
     */
    protected canProfileAccessRepeatableQuests(repeatableConfig: IRepeatableQuestConfig, pmcData: IPmcData): boolean;
    /**
     * Does player have daily scav quests unlocked
     * @param pmcData Player profile to check
     * @returns True if unlocked
     */
    protected playerHasDailyScavQuestsUnlocked(pmcData: IPmcData): boolean;
    /**
     * Does player have daily pmc quests unlocked
     * @param pmcData Player profile to check
     * @param repeatableConfig Config of daily type to check
     * @returns True if unlocked
     */
    protected playerHasDailyPmcQuestsUnlocked(pmcData: IPmcData, repeatableConfig: IRepeatableQuestConfig): boolean;
    /**
     * Get the number of quests to generate - takes into account charisma state of player
     * @param repeatableConfig Config
     * @param pmcData Player profile
     * @returns Quest count
     */
    protected getQuestCount(repeatableConfig: IRepeatableQuestConfig, pmcData: IPmcData): number;
    /**
     * Get repeatable quest data from profile from name (daily/weekly), creates base repeatable quest object if none exists
     * @param repeatableConfig daily/weekly config
     * @param pmcData Profile to search
     * @returns IPmcDataRepeatableQuest
     */
    protected getRepeatableQuestSubTypeFromProfile(repeatableConfig: IRepeatableQuestConfig, pmcData: IPmcData): IPmcDataRepeatableQuest;
    /**
     * Just for debug reasons. Draws dailies a random assort of dailies extracted from dumps
     */
    generateDebugDailies(dailiesPool: any, factory: any, number: number): any;
    /**
     * Used to create a quest pool during each cycle of repeatable quest generation. The pool will be subsequently
     * narrowed down during quest generation to avoid duplicate quests. Like duplicate extractions or elimination quests
     * where you have to e.g. kill scavs in same locations.
     * @param repeatableConfig main repeatable quest config
     * @param pmcLevel level of pmc generating quest pool
     * @returns IQuestTypePool
     */
    protected generateQuestPool(repeatableConfig: IRepeatableQuestConfig, pmcLevel: number): IQuestTypePool;
    protected createBaseQuestPool(repeatableConfig: IRepeatableQuestConfig): IQuestTypePool;
    /**
     * Return the locations this PMC is allowed to get daily quests for based on their level
     * @param locations The original list of locations
     * @param pmcLevel The players level
     * @returns A filtered list of locations that allow the player PMC level to access it
     */
    protected getAllowedLocationsForPmcLevel(locations: Record<ELocationName, string[]>, pmcLevel: number): Partial<Record<ELocationName, string[]>>;
    /**
     * Return true if the given pmcLevel is allowed on the given location
     * @param location The location name to check
     * @param pmcLevel The level of the pmc
     * @returns True if the given pmc level is allowed to access the given location
     */
    protected isPmcLevelAllowedOnLocation(location: string, pmcLevel: number): boolean;
    debugLogRepeatableQuestIds(pmcData: IPmcData): void;
    /**
     * Handle RepeatableQuestChange event
     *
     * Replace a players repeatable quest
     * @param pmcData Player profile
     * @param changeRequest Request object
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    changeRepeatableQuest(pmcData: IPmcData, changeRequest: IRepeatableQuestChangeRequest, sessionID: string): IItemEventRouterResponse;
    /**
     * Find a repeatable (daily/weekly/scav) from a players profile by its id
     * @param questId Id of quest to find
     * @param pmcData Profile that contains quests to look through
     * @returns IGetRepeatableByIdResult
     */
    protected getRepeatableById(questId: string, pmcData: IPmcData): IGetRepeatableByIdResult;
    protected attemptToGenerateRepeatableQuest(pmcData: IPmcData, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * Some accounts have access to free repeatable quest refreshes
     * Track the usage of them inside players profile
     * @param fullProfile Player profile
     * @param repeatableSubType Can be daily / weekly / scav repeatable
     * @param repeatableTypeName Subtype of repeatable quest: daily / weekly / scav
     * @returns Is the repeatable being replaced for free
     */
    protected useFreeRefreshIfAvailable(fullProfile: ISptProfile, repeatableSubType: IPmcDataRepeatableQuest, repeatableTypeName: string): boolean;
}
