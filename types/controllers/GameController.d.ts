import { ApplicationContext } from "@spt/context/ApplicationContext";
import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ICheckVersionResponse } from "@spt/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt/models/eft/game/IGameConfigResponse";
import { IGameKeepAliveResponse } from "@spt/models/eft/game/IGameKeepAliveResponse";
import { IGameModeRequestData } from "@spt/models/eft/game/IGameModeRequestData";
import { IGetRaidTimeRequest } from "@spt/models/eft/game/IGetRaidTimeRequest";
import { IGetRaidTimeResponse } from "@spt/models/eft/game/IGetRaidTimeResponse";
import { IServerDetails } from "@spt/models/eft/game/IServerDetails";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ILootConfig } from "@spt/models/spt/config/ILootConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { CustomLocationWaveService } from "@spt/services/CustomLocationWaveService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { GiftService } from "@spt/services/GiftService";
import { ItemBaseClassService } from "@spt/services/ItemBaseClassService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { OpenZoneService } from "@spt/services/OpenZoneService";
import { ProfileActivityService } from "@spt/services/ProfileActivityService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { RaidTimeAdjustmentService } from "@spt/services/RaidTimeAdjustmentService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class GameController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected preSptModLoader: PreSptModLoader;
    protected httpServerHelper: HttpServerHelper;
    protected randomUtil: RandomUtil;
    protected hideoutHelper: HideoutHelper;
    protected profileHelper: ProfileHelper;
    protected profileFixerService: ProfileFixerService;
    protected localisationService: LocalisationService;
    protected customLocationWaveService: CustomLocationWaveService;
    protected openZoneService: OpenZoneService;
    protected seasonalEventService: SeasonalEventService;
    protected itemBaseClassService: ItemBaseClassService;
    protected giftService: GiftService;
    protected raidTimeAdjustmentService: RaidTimeAdjustmentService;
    protected profileActivityService: ProfileActivityService;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected httpConfig: IHttpConfig;
    protected coreConfig: ICoreConfig;
    protected locationConfig: ILocationConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected pmcConfig: IPmcConfig;
    protected lootConfig: ILootConfig;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, timeUtil: TimeUtil, hashUtil: HashUtil, preSptModLoader: PreSptModLoader, httpServerHelper: HttpServerHelper, randomUtil: RandomUtil, hideoutHelper: HideoutHelper, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, seasonalEventService: SeasonalEventService, itemBaseClassService: ItemBaseClassService, giftService: GiftService, raidTimeAdjustmentService: RaidTimeAdjustmentService, profileActivityService: ProfileActivityService, applicationContext: ApplicationContext, configServer: ConfigServer, cloner: ICloner);
    load(): void;
    /**
     * Handle client/game/start
     */
    gameStart(_url: string, _info: IEmptyRequestData, sessionID: string, startTimeStampMS: number): void;
    protected adjustHideoutCraftTimes(overrideSeconds: number): void;
    /**
     * Adjust all hideout craft times to be no higher than the override
     */
    protected adjustHideoutBuildTimes(overrideSeconds: number): void;
    protected adjustLocationBotValues(): void;
    /**
     * Out of date/incorrectly made trader mods forget this data
     */
    protected checkTraderRepairValuesExist(): void;
    protected addCustomLooseLootPositions(): void;
    protected adjustLooseLootSpawnProbabilities(): void;
    /** Apply custom limits on bot types as defined in configs/location.json/botTypeLimits */
    protected adjustMapBotLimits(): void;
    /**
     * Handle client/game/config
     */
    getGameConfig(sessionID: string): IGameConfigResponse;
    /**
     * Handle client/game/mode
     */
    getGameMode(sessionID: string, info: IGameModeRequestData): any;
    /**
     * Handle client/server/list
     */
    getServer(sessionId: string): IServerDetails[];
    /**
     * Handle client/match/group/current
     */
    getCurrentGroup(sessionId: string): ICurrentGroupResponse;
    /**
     * Handle client/checkVersion
     */
    getValidGameVersion(sessionId: string): ICheckVersionResponse;
    /**
     * Handle client/game/keepalive
     */
    getKeepAlive(sessionId: string): IGameKeepAliveResponse;
    /**
     * Handle singleplayer/settings/getRaidTime
     */
    getRaidTime(sessionId: string, request: IGetRaidTimeRequest): IGetRaidTimeResponse;
    /**
     * BSG have two values for shotgun dispersion, we make sure both have the same value
     */
    protected fixShotgunDispersions(): void;
    /**
     * Players set botReload to a high value and don't expect the crazy fast reload speeds, give them a warn about it
     * @param pmcProfile Player profile
     */
    protected warnOnActiveBotReloadSkill(pmcProfile: IPmcData): void;
    protected setAllDbItemsAsSellableOnFlea(): void;
    /**
     * When player logs in, iterate over all active effects and reduce timer
     * @param pmcProfile Profile to adjust values for
     */
    protected updateProfileHealthValues(pmcProfile: IPmcData): void;
    /**
     * Waves with an identical min/max values spawn nothing, the number of bots that spawn is the difference between min and max
     */
    protected fixBrokenOfflineMapWaves(): void;
    /**
     * Make Rogues spawn later to allow for scavs to spawn first instead of rogues filling up all spawn positions
     */
    protected fixRoguesSpawningInstantlyOnLighthouse(): void;
    /**
     * Send starting gifts to profile after x days
     * @param pmcProfile Profile to add gifts to
     */
    protected sendPraporGiftsToNewProfiles(pmcProfile: IPmcData): void;
    /**
     * Find and split waves with large numbers of bots into smaller waves - BSG appears to reduce the size of these
     * waves to one bot when they're waiting to spawn for too long
     */
    protected splitBotWavesIntoSingleWaves(): void;
    /**
     * Get a list of installed mods and save their details to the profile being used
     * @param fullProfile Profile to add mod details to
     */
    protected saveActiveModsToProfile(fullProfile: ISptProfile): void;
    /**
     * Check for any missing assorts inside each traders assort.json data, checking against traders questassort.json
     */
    protected validateQuestAssortUnlocksExist(): void;
    /**
     * Add the logged in players name to PMC name pool
     * @param pmcProfile Profile of player to get name from
     */
    protected addPlayerToPMCNames(pmcProfile: IPmcData): void;
    /**
     * Check for a dialog with the key 'undefined', and remove it
     * @param fullProfile Profile to check for dialog in
     */
    protected checkForAndRemoveUndefinedDialogs(fullProfile: ISptProfile): void;
    /**
     * Blank out the "test" mail message from prapor
     */
    protected removePraporTestMessage(): void;
    /**
     * Make non-trigger-spawned raiders spawn earlier + always
     */
    protected adjustLabsRaiderSpawnRate(): void;
    protected logProfileDetails(fullProfile: ISptProfile): void;
}
