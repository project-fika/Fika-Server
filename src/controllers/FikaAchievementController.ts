import { inject, injectable } from "tsyringe";

import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";

@injectable()
export class FikaAchievementController {
    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("DatabaseService") protected databaseService: DatabaseService,
    ) {
        // empty
    }
    getAchievementStatistics(_sessionID: string): ICompletedAchievementsResponse {
        const achievements = this.databaseService.getAchievements();
        const stats: Record<string, number> = {};

        const profiles = Object.values(this.saveServer.getProfiles());

        for (const achievement of achievements) {
            let percentage = 0;
            for (const profile of profiles) {
                if (profile.info?.password === "fika-dedicated") {
                    continue;
                }

                if (!profile.characters?.pmc?.Achievements) {
                    continue;
                }

                if (!(achievement.id in profile.characters.pmc.Achievements)) {
                    continue;
                }

                percentage++;
            }

            percentage = (percentage / profiles.length) * 100;
            stats[achievement.id] = percentage;
        }

        return { elements: stats };
    }
}
