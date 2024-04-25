import { AchievementController } from "@spt-aki/controllers/AchievementController";
import { ProfileController } from "@spt-aki/controllers/ProfileController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { ICompletedAchievementsResponse } from "@spt-aki/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt-aki/models/eft/profile/IGetAchievementsResponse";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
