import { DependencyContainer, inject, injectable } from "tsyringe";

import { AchievementController } from "@spt/controllers/AchievementController";
import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";

import { FikaAchievementController } from "../../controllers/FikaAchievementController";
import { Override } from "../../di/Override";

@injectable()
export class AchievementControllerOverride extends Override {
    constructor(@inject("FikaAchievementController") protected fikaAchievementController: FikaAchievementController) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "AchievementController",
            (_t, result: AchievementController) => {
                result.getAchievementStatistics = (sessionID: string): ICompletedAchievementsResponse => {
                    return this.fikaAchievementController.getAchievementStatistics(sessionID);
                };
            },
            { frequency: "Always" },
        );
    }
}
