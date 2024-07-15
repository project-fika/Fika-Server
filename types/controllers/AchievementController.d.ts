import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt/models/eft/profile/IGetAchievementsResponse";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
/**
 * Logic for handling In Raid callbacks
 */
export declare class AchievementController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    constructor(logger: ILogger, databaseService: DatabaseService);
    /**
     * Get base achievements
     * @param sessionID Session id
     */
    getAchievements(sessionID: string): IGetAchievementsResponse;
    /**
     * Shows % of 'other' players who've completed each achievement
     * @param sessionId Session id
     * @returns ICompletedAchievementsResponse
     */
    getAchievementStatistics(sessionId: string): ICompletedAchievementsResponse;
}
