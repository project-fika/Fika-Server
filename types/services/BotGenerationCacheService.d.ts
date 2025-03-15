import { BotHelper } from "@spt/helpers/BotHelper";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotGenerationCacheService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected storedBots: Map<string, IBotBase[]>;
    protected activeBotsInRaid: IBotBase[];
    constructor(logger: ILogger, randomUtil: RandomUtil, localisationService: LocalisationService, botHelper: BotHelper);
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
    cacheHasBotWithKey(key: string, size?: number): boolean;
    getCachedBotCount(key: string): number;
    createCacheKey(role: string, difficulty: string): string;
}
