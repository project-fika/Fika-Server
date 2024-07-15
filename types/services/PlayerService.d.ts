import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class PlayerService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected localisationService: LocalisationService;
    protected databaseService: DatabaseService;
    constructor(logger: ILogger, timeUtil: TimeUtil, localisationService: LocalisationService, databaseService: DatabaseService);
    /**
     * Get level of player
     * @param pmcData Player profile
     * @returns Level of player
     */
    calculateLevel(pmcData: IPmcData): number;
}
