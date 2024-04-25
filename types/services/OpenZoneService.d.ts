import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
/** Service for adding new zones to a maps OpenZones property */
export declare class OpenZoneService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, jsonUtil: JsonUtil, databaseServer: DatabaseServer, localisationService: LocalisationService, configServer: ConfigServer);
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
