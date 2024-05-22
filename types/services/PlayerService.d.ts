import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class PlayerService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected localisationService: LocalisationService;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, timeUtil: TimeUtil, localisationService: LocalisationService, databaseServer: DatabaseServer);
    /**
     * Get level of player
     * @param pmcData Player profile
     * @returns Level of player
     */
    calculateLevel(pmcData: IPmcData): number;
}
