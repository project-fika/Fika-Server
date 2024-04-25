import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { LocationGenerator } from "@spt-aki/generators/LocationGenerator";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { ILocationBase } from "@spt-aki/models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "@spt-aki/models/eft/common/ILocationsSourceDestinationBase";
import { IAirdropLootResult } from "@spt-aki/models/eft/location/IAirdropLootResult";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { AirdropTypeEnum } from "@spt-aki/models/enums/AirdropType";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { LootRequest } from "@spt-aki/models/spt/services/LootRequest";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { RaidTimeAdjustmentService } from "@spt-aki/services/RaidTimeAdjustmentService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class LocationController {
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected logger: ILogger;
    protected locationGenerator: LocationGenerator;
    protected localisationService: LocalisationService;
    protected raidTimeAdjustmentService: RaidTimeAdjustmentService;
    protected itemFilterService: ItemFilterService;
    protected lootGenerator: LootGenerator;
    protected databaseServer: DatabaseServer;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected airdropConfig: IAirdropConfig;
    protected locationConfig: ILocationConfig;
    constructor(jsonUtil: JsonUtil, hashUtil: HashUtil, randomUtil: RandomUtil, weightedRandomHelper: WeightedRandomHelper, logger: ILogger, locationGenerator: LocationGenerator, localisationService: LocalisationService, raidTimeAdjustmentService: RaidTimeAdjustmentService, itemFilterService: ItemFilterService, lootGenerator: LootGenerator, databaseServer: DatabaseServer, timeUtil: TimeUtil, configServer: ConfigServer, applicationContext: ApplicationContext);
    /**
     * Handle client/location/getLocalloot
     * Get a location (map) with generated loot data
     * @param sessionId Player id
     * @param request Map request to generate
     * @returns ILocationBase
     */
    get(sessionId: string, request: IGetLocationRequestData): ILocationBase;
    /**
     * Generate a maps base location with loot
     * @param name Map name
     * @returns ILocationBase
     */
    protected generate(name: string): ILocationBase;
    /**
     * Handle client/locations
     * Get all maps base location properties without loot data
     * @param sessionId Players Id
     * @returns ILocationsGenerateAllResponse
     */
    generateAll(sessionId: string): ILocationsGenerateAllResponse;
    /**
     * Handle client/location/getAirdropLoot
     * Get loot for an airdrop container
     * Generates it randomly based on config/airdrop.json values
     * @returns Array of LootItem objects
     */
    getAirdropLoot(): IAirdropLootResult;
    /**
     * Randomly pick a type of airdrop loot using weighted values from config
     * @returns airdrop type value
     */
    protected chooseAirdropType(): AirdropTypeEnum;
    /**
     * Get the configuration for a specific type of airdrop
     * @param airdropType Type of airdrop to get settings for
     * @returns LootRequest
     */
    protected getAirdropLootConfigByType(airdropType: AirdropTypeEnum): LootRequest;
}
