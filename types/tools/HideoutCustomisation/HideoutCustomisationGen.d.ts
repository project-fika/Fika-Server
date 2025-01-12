import { OnLoad } from "@spt/di/OnLoad";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { FileSystem } from "@spt/utils/FileSystem";
export declare class HideoutCustomisationGen {
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected fileSystem: FileSystem;
    protected onLoadComponents: OnLoad[];
    private questCustomisationReward;
    private achievementCustomisationReward;
    constructor(databaseServer: DatabaseServer, logger: ILogger, fileSystem: FileSystem, onLoadComponents: OnLoad[]);
    run(): Promise<void>;
    private updateCustomisationStorage;
    private buildQuestCustomisationList;
    private buildAchievementRewardCustomisationList;
}
