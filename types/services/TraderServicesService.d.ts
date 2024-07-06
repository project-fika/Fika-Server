import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ITraderServiceModel } from "@spt/models/spt/services/ITraderServiceModel";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class TraderServicesService {
    protected profileHelper: ProfileHelper;
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected cloner: ICloner;
    constructor(profileHelper: ProfileHelper, logger: ILogger, databaseServer: DatabaseServer, cloner: ICloner);
    getTraderServices(sessionId: string, traderId: string): ITraderServiceModel[];
}
