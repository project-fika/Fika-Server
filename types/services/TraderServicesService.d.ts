import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { ITraderServiceModel } from "@spt-aki/models/spt/services/ITraderServiceModel";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ICloner } from "@spt-aki/utils/cloners/ICloner";
export declare class TraderServicesService {
    protected profileHelper: ProfileHelper;
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected cloner: ICloner;
    constructor(profileHelper: ProfileHelper, logger: ILogger, databaseServer: DatabaseServer, cloner: ICloner);
    getTraderServices(sessionId: string, traderId: string): ITraderServiceModel[];
}
