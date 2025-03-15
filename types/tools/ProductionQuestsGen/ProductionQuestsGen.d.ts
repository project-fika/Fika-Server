import { OnLoad } from "@spt/di/OnLoad";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
export declare class ProductionQuestsGen {
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected fileSystemSync: FileSystemSync;
    protected onLoadComponents: OnLoad[];
    private questProductionOutputList;
    private questProductionMap;
    private blacklistedProductions;
    constructor(databaseServer: DatabaseServer, logger: ILogger, fileSystemSync: FileSystemSync, onLoadComponents: OnLoad[]);
    run(): Promise<void>;
    private updateProductionQuests;
    private isValidQuestProduction;
    private buildQuestProductionList;
}
