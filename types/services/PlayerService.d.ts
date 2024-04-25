import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
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
