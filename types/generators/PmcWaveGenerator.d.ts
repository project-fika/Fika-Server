import { IBossLocationSpawn, ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class PmcWaveGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected configServer: ConfigServer;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, configServer: ConfigServer);
    /**
     * Add a pmc wave to a map
     * @param locationId e.g. factory4_day, bigmap
     * @param waveToAdd Boss wave to add to map
     */
    AddPmcWaveToLocation(locationId: string, waveToAdd: IBossLocationSpawn): void;
    /**
     * Add custom boss and normal waves to maps found in config/location.json to db
     */
    applyWaveChangesToAllMaps(): void;
    applyWaveChangesToMapByName(name: string): void;
    applyWaveChangesToMap(location: ILocationBase): void;
}
