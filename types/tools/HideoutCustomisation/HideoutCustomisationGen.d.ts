import { OnLoad } from "@spt/di/OnLoad";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
export declare class HideoutCustomisationGen {
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected onLoadComponents: OnLoad[];
    private questCustomisationReward;
    private achievementCustomisationReward;
    constructor(databaseServer: DatabaseServer, logger: ILogger, onLoadComponents: OnLoad[]);
    run(): Promise<void>;
    private updateCustomisationStorage;
    private buildQuestCustomisationList;
    private buildAchievementRewardCustomisationList;
}
