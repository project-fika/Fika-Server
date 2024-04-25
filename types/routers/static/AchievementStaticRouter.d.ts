import { AchievementCallbacks } from "@spt-aki/callbacks/AchievementCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class AchievementStaticRouter extends StaticRouter {
    protected achievementCallbacks: AchievementCallbacks;
    constructor(achievementCallbacks: AchievementCallbacks);
}
