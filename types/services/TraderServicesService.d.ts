import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ITraderServiceModel } from "@spt/models/spt/services/ITraderServiceModel";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class TraderServicesService {
    protected profileHelper: ProfileHelper;
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected cloner: ICloner;
    constructor(profileHelper: ProfileHelper, logger: ILogger, databaseService: DatabaseService, cloner: ICloner);
    getTraderServices(sessionId: string, traderId: string): ITraderServiceModel[];
}
