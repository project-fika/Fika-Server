import { RepeatableQuestGenerator } from "@spt-aki/generators/RepeatableQuestGenerator";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { RepeatableQuestHelper } from "@spt-aki/helpers/RepeatableQuestHelper";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "@spt-aki/models/eft/common/tables/IRepeatableQuests";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepeatableQuestChangeRequest } from "@spt-aki/models/eft/quests/IRepeatableQuestChangeRequest";
import { ELocationName } from "@spt-aki/models/enums/ELocationName";
import { IQuestConfig, IRepeatableQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { IQuestTypePool } from "@spt-aki/models/spt/repeatable/IQuestTypePool";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { ProfileFixerService } from "@spt-aki/services/ProfileFixerService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ObjectId } from "@spt-aki/utils/ObjectId";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class RepeatableQuestController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected profileHelper: ProfileHelper;
    protected profileFixerService: ProfileFixerService;
    protected eventOutputHolder: EventOutputHolder;
    protected paymentService: PaymentService;
    protected objectId: ObjectId;
    protected repeatableQuestGenerator: RepeatableQuestGenerator;
    protected repeatableQuestHelper: RepeatableQuestHelper;
    protected questHelper: QuestHelper;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, timeUtil: TimeUtil, randomUtil: RandomUtil, httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, eventOutputHolder: EventOutputHolder, paymentService: PaymentService, objectId: ObjectId, repeatableQuestGenerator: RepeatableQuestGenerator, repeatableQuestHelper: RepeatableQuestHelper, questHelper: QuestHelper, configServer: ConfigServer);
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
     * @param   {string}    _info       Request from client
     * @param   {string}    sessionID   Player's session id
     *
     * @returns  {array}                Array of "repeatableQuestObjects" as descibed above
     */
    getClientRepeatableQuests(_info: IEmptyRequestData, sessionID: string): IPmcDataRepeatableQuest[];
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
     * @param pmcLevel The level of the player PMC
     * @returns A filtered list of locations that allow the player PMC level to access it
     */
    protected getAllowedLocations(locations: Record<ELocationName, string[]>, pmcLevel: number): Partial<Record<ELocationName, string[]>>;
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
     */
    changeRepeatableQuest(pmcData: IPmcData, changeRequest: IRepeatableQuestChangeRequest, sessionID: string): IItemEventRouterResponse;
    protected attemptToGenerateRepeatableQuest(pmcData: IPmcData, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
}
