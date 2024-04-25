import { ITraderServiceModel } from "@spt-aki/models/spt/services/ITraderServiceModel";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
export declare class TraderServicesService {
    protected profileHelper: ProfileHelper;
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    constructor(profileHelper: ProfileHelper, jsonUtil: JsonUtil, logger: ILogger, databaseServer: DatabaseServer);
    getTraderServices(sessionId: string, traderId: string): ITraderServiceModel[];
}
