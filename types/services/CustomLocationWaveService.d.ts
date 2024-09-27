import { IBossLocationSpawn, IWave } from "@spt/models/eft/common/ILocationBase";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class CustomLocationWaveService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected configServer: ConfigServer;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, configServer: ConfigServer);
    /**
     * Add a boss wave to a map
     * @param locationId e.g. factory4_day, bigmap
     * @param waveToAdd Boss wave to add to map
     */
    addBossWaveToMap(locationId: string, waveToAdd: IBossLocationSpawn): void;
    /**
     * Add a normal bot wave to a map
     * @param locationId e.g. factory4_day, bigmap
     * @param waveToAdd Wave to add to map
     */
    addNormalWaveToMap(locationId: string, waveToAdd: IWave): void;
    /**
     * Clear all custom boss waves from a map
     * @param locationId e.g. factory4_day, bigmap
     */
    clearBossWavesForMap(locationId: string): void;
    /**
     * Clear all custom normal waves from a map
     * @param locationId e.g. factory4_day, bigmap
     */
    clearNormalWavesForMap(locationId: string): void;
    /**
     * Add custom boss and normal waves to maps found in config/location.json to db
     */
    applyWaveChangesToAllMaps(): void;
}
