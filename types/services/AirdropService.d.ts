import { LootGenerator } from "@spt/generators/LootGenerator";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IGetAirdropLootRequest } from "@spt/models/eft/location/IGetAirdropLootRequest";
import { IGetAirdropLootResponse } from "@spt/models/eft/location/IGetAirdropLootResponse";
import { AirdropTypeEnum, SptAirdropTypeEnum } from "@spt/models/enums/AirdropType";
import { IAirdropConfig } from "@spt/models/spt/config/IAirdropConfig";
import { IAirdropLootRequest } from "@spt/models/spt/services/ILootRequest";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class AirdropService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected localisationService: LocalisationService;
    protected itemFilterService: ItemFilterService;
    protected lootGenerator: LootGenerator;
    protected databaseService: DatabaseService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected airdropConfig: IAirdropConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, itemHelper: ItemHelper, weightedRandomHelper: WeightedRandomHelper, localisationService: LocalisationService, itemFilterService: ItemFilterService, lootGenerator: LootGenerator, databaseService: DatabaseService, configServer: ConfigServer, cloner: ICloner);
    generateCustomAirdropLoot(request: IGetAirdropLootRequest): IGetAirdropLootResponse;
    /**
     * Handle client/location/getAirdropLoot
     * Get loot for an airdrop container
     * Generates it randomly based on config/airdrop.json values
     * @param forcedAirdropType OPTIONAL - Desired airdrop type, randomised when not provided
     * @returns Array of LootItem objects
     */
    generateAirdropLoot(forcedAirdropType?: any): IGetAirdropLootResponse;
    /**
     * Create a container create item based on passed in airdrop type
     * @param airdropType What tpye of container: weapon/common etc
     * @returns Item
     */
    protected getAirdropCrateItem(airdropType: SptAirdropTypeEnum): IItem;
    /**
     * Randomly pick a type of airdrop loot using weighted values from config
     * @returns airdrop type value
     */
    protected chooseAirdropType(): SptAirdropTypeEnum;
    /**
     * Get the configuration for a specific type of airdrop
     * @param airdropType Type of airdrop to get settings for
     * @returns LootRequest
     */
    protected getAirdropLootConfigByType(airdropType: AirdropTypeEnum): IAirdropLootRequest;
}
