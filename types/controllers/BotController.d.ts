import { ApplicationContext } from "@spt/context/ApplicationContext";
import { BotGenerator } from "@spt/generators/BotGenerator";
import { BotDifficultyHelper } from "@spt/helpers/BotDifficultyHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { MinMax } from "@spt/models/common/MinMax";
import { ICondition, IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IBotCore } from "@spt/models/eft/common/tables/IBotCore";
import { IDifficultyCategories } from "@spt/models/eft/common/tables/IBotType";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MatchBotDetailsCacheService } from "@spt/services/MatchBotDetailsCacheService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BotController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected botGenerator: BotGenerator;
    protected botHelper: BotHelper;
    protected botDifficultyHelper: BotDifficultyHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected botGenerationCacheService: BotGenerationCacheService;
    protected matchBotDetailsCacheService: MatchBotDetailsCacheService;
    protected localisationService: LocalisationService;
    protected seasonalEventService: SeasonalEventService;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected randomUtil: RandomUtil;
    protected cloner: ICloner;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, botGenerator: BotGenerator, botHelper: BotHelper, botDifficultyHelper: BotDifficultyHelper, weightedRandomHelper: WeightedRandomHelper, botGenerationCacheService: BotGenerationCacheService, matchBotDetailsCacheService: MatchBotDetailsCacheService, localisationService: LocalisationService, seasonalEventService: SeasonalEventService, profileHelper: ProfileHelper, configServer: ConfigServer, applicationContext: ApplicationContext, randomUtil: RandomUtil, cloner: ICloner);
    /**
     * Return the number of bot load-out varieties to be generated
     * @param type bot Type we want the load-out gen count for
     * @returns number of bots to generate
     */
    getBotPresetGenerationLimit(type: string): number;
    /**
     * Handle singleplayer/settings/bot/difficulty
     * Get the core.json difficulty settings from database/bots
     * @returns IBotCore
     */
    getBotCoreDifficulty(): IBotCore;
    /**
     * Get bot difficulty settings
     * Adjust PMC settings to ensure they engage the correct bot types
     * @param type what bot the server is requesting settings for
     * @param diffLevel difficulty level server requested settings for
     * @param raidConfig OPTIONAL - applicationContext Data stored at start of raid
     * @param ignoreRaidSettings should raid settings chosen pre-raid be ignored
     * @returns Difficulty object
     */
    getBotDifficulty(type: string, diffLevel: string, raidConfig?: IGetRaidConfigurationRequestData, ignoreRaidSettings?: boolean): IDifficultyCategories;
    getAllBotDifficulties(): Record<string, any>;
    /**
     * Generate bot profiles and store in cache
     * @param sessionId Session id
     * @param info bot generation request info
     * @returns IBotBase array
     */
    generate(sessionId: string, info: IGenerateBotsRequestData): Promise<IBotBase[]>;
    /**
     * On first bot generation bots are generated and stored inside a cache, ready to be used later
     * @param request Bot generation request object
     * @param pmcProfile Player profile
     * @param sessionId Session id
     * @returns IBotBase[]
     */
    protected generateMultipleBotsAndCache(request: IGenerateBotsRequestData, pmcProfile: IPmcData, sessionId: string): Promise<IBotBase[]>;
    protected getMostRecentRaidSettings(): IGetRaidConfigurationRequestData;
    /**
     * Get min/max level range values for a specific map
     * @param location Map name e.g. factory4_day
     * @returns MinMax
     */
    protected getPmcLevelRangeForMap(location: string): MinMax;
    /**
     * Create a BotGenerationDetails for the bot generator to use
     * @param condition Client data defining bot type and difficulty
     * @param pmcProfile Player who is generating bots
     * @param allPmcsHaveSameNameAsPlayer Should all PMCs have same name as player
     * @param raidSettings Settings chosen pre-raid by player
     * @param botCountToGenerate How many bots to generate
     * @param generateAsPmc Force bot being generated a PMC
     * @returns BotGenerationDetails
     */
    protected getBotGenerationDetailsForWave(condition: ICondition, pmcProfile: IPmcData, allPmcsHaveSameNameAsPlayer: boolean, raidSettings: IGetRaidConfigurationRequestData, botCountToGenerate: number, generateAsPmc: boolean): IBotGenerationDetails;
    /**
     * Get players profile level
     * @param pmcProfile Profile to get level from
     * @returns Level as number
     */
    protected getPlayerLevelFromProfile(pmcProfile: IPmcData): number;
    /**
     * Generate many bots and store then on the cache
     * @param condition the condition details to generate the bots with
     * @param botGenerationDetails the bot details to generate the bot with
     * @param sessionId Session id
     * @returns A promise for the bots to be done generating
     */
    protected generateWithBotDetails(condition: ICondition, botGenerationDetails: IBotGenerationDetails, sessionId: string): Promise<void>;
    /**
     * Generate a single bot and store in the cache
     * @param botGenerationDetails the bot details to generate the bot with
     * @param sessionId Session id
     * @param cacheKey the cache key to store the bot with
     * @returns A promise for the bot to be stored
     */
    protected generateSingleBotAndStoreInCache(botGenerationDetails: IBotGenerationDetails, sessionId: string, cacheKey: string): Promise<void>;
    /**
     * Pull a single bot out of cache and return, if cache is empty add bots to it and then return
     * @param sessionId Session id
     * @param request Bot generation request object
     * @returns Single IBotBase object
     */
    protected returnSingleBotFromCache(sessionId: string, request: IGenerateBotsRequestData): Promise<IBotBase[]>;
    protected getPmcConversionMinMaxForLocation(requestedBotRole: string, location: string): MinMax;
    protected updateBotGenerationDetailsToRandomBoss(botGenerationDetails: IBotGenerationDetails, possibleBossTypeWeights: Record<string, number>): void;
    /**
     * Get the difficulty passed in, if its not "asonline", get selected difficulty from config
     * @param requestedDifficulty
     * @returns
     */
    getPMCDifficulty(requestedDifficulty: string): string;
    /**
     * Get the max number of bots allowed on a map
     * Looks up location player is entering when getting cap value
     * @param location The map location cap was requested for
     * @returns cap number
     */
    getBotCap(location: string): number;
    getAiBotBrainTypes(): any;
}
