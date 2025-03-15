import { PmcWaveGenerator } from "@spt/generators/PmcWaveGenerator";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ILootConfig } from "@spt/models/spt/config/ILootConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { CustomLocationWaveService } from "@spt/services/CustomLocationWaveService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemBaseClassService } from "@spt/services/ItemBaseClassService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { OpenZoneService } from "@spt/services/OpenZoneService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class PostDbLoadService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseService: DatabaseService;
    protected localisationService: LocalisationService;
    protected customLocationWaveService: CustomLocationWaveService;
    protected openZoneService: OpenZoneService;
    protected seasonalEventService: SeasonalEventService;
    protected itemBaseClassService: ItemBaseClassService;
    protected pmcWaveGenerator: PmcWaveGenerator;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected coreConfig: ICoreConfig;
    protected locationConfig: ILocationConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected pmcConfig: IPmcConfig;
    protected lootConfig: ILootConfig;
    protected botConfig: IBotConfig;
    protected itemConfig: IItemConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseService: DatabaseService, localisationService: LocalisationService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, seasonalEventService: SeasonalEventService, itemBaseClassService: ItemBaseClassService, pmcWaveGenerator: PmcWaveGenerator, configServer: ConfigServer, cloner: ICloner);
    performPostDbLoadActions(): void;
    protected removeExistingPmcWaves(): void;
    protected removeNewBeginningRequirementFromPrestige(): void;
    protected unlockHideoutLootCrateCrafts(): void;
    protected cloneExistingCraftsAndAddNew(): void;
    protected adjustMinReserveRaiderSpawnChance(): void;
    protected addCustomLooseLootPositions(): void;
    /**
     * BSG have two values for shotgun dispersion, we make sure both have the same value
     */
    protected fixShotgunDispersions(): void;
    /** Apply custom limits on bot types as defined in configs/location.json/botTypeLimits */
    protected adjustMapBotLimits(): void;
    protected adjustLooseLootSpawnProbabilities(): void;
    protected adjustLocationBotValues(): void;
    /**
     * Make Rogues spawn later to allow for scavs to spawn first instead of rogues filling up all spawn positions
     */
    protected fixRoguesSpawningInstantlyOnLighthouse(): void;
    /**
     * Find and split waves with large numbers of bots into smaller waves - BSG appears to reduce the size of these
     * waves to one bot when they're waiting to spawn for too long
     */
    protected splitBotWavesIntoSingleWaves(): void;
    /**
     * Make non-trigger-spawned raiders spawn earlier + always
     */
    protected adjustLabsRaiderSpawnRate(): void;
    protected adjustHideoutCraftTimes(overrideSeconds: number): void;
    /**
     * Adjust all hideout craft times to be no higher than the override
     */
    protected adjustHideoutBuildTimes(overrideSeconds: number): void;
    /**
     * Blank out the "test" mail message from prapor
     */
    protected removePraporTestMessage(): void;
    /**
     * Check for any missing assorts inside each traders assort.json data, checking against traders questassort.json
     */
    protected validateQuestAssortUnlocksExist(): void;
    protected setAllDbItemsAsSellableOnFlea(): void;
    protected addMissingTraderBuyRestrictionMaxValue(): void;
    protected applyFleaPriceOverrides(): void;
    protected addCustomItemPresetsToGlobals(): void;
}
