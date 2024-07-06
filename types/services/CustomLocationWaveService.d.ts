import { BossLocationSpawn, Wave } from "@spt/models/eft/common/ILocationBase";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class CustomLocationWaveService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Add a boss wave to a map
     * @param locationId e.g. factory4_day, bigmap
     * @param waveToAdd Boss wave to add to map
     */
    addBossWaveToMap(locationId: string, waveToAdd: BossLocationSpawn): void;
    /**
     * Add a normal bot wave to a map
     * @param locationId e.g. factory4_day, bigmap
     * @param waveToAdd Wave to add to map
     */
    addNormalWaveToMap(locationId: string, waveToAdd: Wave): void;
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
