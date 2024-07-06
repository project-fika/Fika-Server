import { AchievementCallbacks } from "@spt/callbacks/AchievementCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class AchievementStaticRouter extends StaticRouter {
    protected achievementCallbacks: AchievementCallbacks;
    constructor(achievementCallbacks: AchievementCallbacks);
}
