import { AchievementController } from "@spt/controllers/AchievementController";
import { ProfileController } from "@spt/controllers/ProfileController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import type { IGetAchievementsResponse } from "@spt/models/eft/profile/IGetAchievementsResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class AchievementCallbacks {
    protected achievementController: AchievementController;
    protected profileController: ProfileController;
    protected httpResponse: HttpResponseUtil;
    constructor(achievementController: AchievementController, profileController: ProfileController, httpResponse: HttpResponseUtil);
    /**
     * Handle client/achievement/list
     */
    getAchievements(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetAchievementsResponse>;
    /**
     * Handle client/achievement/statistic
     */
    statistic(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICompletedAchievementsResponse>;
}
