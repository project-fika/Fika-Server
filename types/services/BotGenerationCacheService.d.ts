import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class BotGenerationCacheService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected storedBots: Map<string, IBotBase[]>;
    protected activeBotsInRaid: IBotBase[];
    constructor(logger: ILogger, randomUtil: RandomUtil, jsonUtil: JsonUtil, localisationService: LocalisationService, botHelper: BotHelper);
    /**
     * Store array of bots in cache, shuffle results before storage
     * @param botsToStore Bots we want to store in the cache
     */
    storeBots(key: string, botsToStore: IBotBase[]): void;
    /**
     * Find and return a bot based on its role
     * Remove bot from internal array so it can't be retreived again
     * @param key role to retreive (assault/bossTagilla etc)
     * @returns IBotBase object
     */
    getBot(key: string): IBotBase;
    /**
     * Cache a bot that has been sent to the client in memory for later use post-raid to determine if player killed a traitor scav
     * @param botToStore Bot object to store
     */
    storeUsedBot(botToStore: IBotBase): void;
    /**
     * Get a bot by its profileId that has been generated and sent to client for current raid
     * Cache is wiped post-raid in client/match/offline/end  endOfflineRaid()
     * @param profileId Id of bot to get
     * @returns IBotBase
     */
    getUsedBot(profileId: string): IBotBase;
    /**
     * Remove all cached bot profiles from memory
     */
    clearStoredBots(): void;
    /**
     * Does cache have a bot with requested key
     * @returns false if empty
     */
    cacheHasBotOfRole(key: string): boolean;
}
