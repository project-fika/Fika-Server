import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
/** Service for adding new zones to a maps OpenZones property */
export declare class OpenZoneService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Add open zone to specified map
     * @param locationId map location (e.g. factory4_day)
     * @param zoneToAdd zone to add
     */
    addZoneToMap(locationId: string, zoneToAdd: string): void;
    /**
     * Add open zones to all maps found in config/location.json to db
     */
    applyZoneChangesToAllMaps(): void;
}
