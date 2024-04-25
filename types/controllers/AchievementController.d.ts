import { ICompletedAchievementsResponse } from "@spt-aki/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt-aki/models/eft/profile/IGetAchievementsResponse";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
/**
 * Logic for handling In Raid callbacks
 */
export declare class AchievementController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, databaseServer: DatabaseServer);
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
