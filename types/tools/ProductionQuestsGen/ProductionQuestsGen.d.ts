import { OnLoad } from "@spt/di/OnLoad";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
export declare class ProductionQuestsGen {
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected onLoadComponents: OnLoad[];
    private questProductionOutputList;
    private questProductionMap;
    private blacklistedProductions;
    constructor(databaseServer: DatabaseServer, logger: ILogger, onLoadComponents: OnLoad[]);
    run(): Promise<void>;
    private updateProductionQuests;
    private isValidQuestProduction;
    private buildQuestProductionList;
}
