import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { HideoutHelper } from "@spt-aki/helpers/HideoutHelper";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { ICheckVersionResponse } from "@spt-aki/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt-aki/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt-aki/models/eft/game/IGameConfigResponse";
import { IGameKeepAliveResponse } from "@spt-aki/models/eft/game/IGameKeepAliveResponse";
import { IGetRaidTimeRequest } from "@spt-aki/models/eft/game/IGetRaidTimeRequest";
import { IGetRaidTimeResponse } from "@spt-aki/models/eft/game/IGetRaidTimeResponse";
import { IServerDetails } from "@spt-aki/models/eft/game/IServerDetails";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { ILootConfig } from "@spt-aki/models/spt/config/ILootConfig";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { CustomLocationWaveService } from "@spt-aki/services/CustomLocationWaveService";
import { GiftService } from "@spt-aki/services/GiftService";
import { ItemBaseClassService } from "@spt-aki/services/ItemBaseClassService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { OpenZoneService } from "@spt-aki/services/OpenZoneService";
import { ProfileFixerService } from "@spt-aki/services/ProfileFixerService";
import { RaidTimeAdjustmentService } from "@spt-aki/services/RaidTimeAdjustmentService";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class GameController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected preAkiModLoader: PreAkiModLoader;
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
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    protected coreConfig: ICoreConfig;
    protected locationConfig: ILocationConfig;
    protected ragfairConfig: IRagfairConfig;
    protected pmcConfig: IPmcConfig;
    protected lootConfig: ILootConfig;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, jsonUtil: JsonUtil, timeUtil: TimeUtil, hashUtil: HashUtil, preAkiModLoader: PreAkiModLoader, httpServerHelper: HttpServerHelper, randomUtil: RandomUtil, hideoutHelper: HideoutHelper, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, seasonalEventService: SeasonalEventService, itemBaseClassService: ItemBaseClassService, giftService: GiftService, raidTimeAdjustmentService: RaidTimeAdjustmentService, applicationContext: ApplicationContext, configServer: ConfigServer);
    load(): void;
    /**
     * Handle client/game/start
     */
    gameStart(_url: string, _info: IEmptyRequestData, sessionID: string, startTimeStampMS: number): void;
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
    protected flagAllItemsInDbAsSellableOnFlea(): void;
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
    protected saveActiveModsToProfile(fullProfile: IAkiProfile): void;
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
    protected checkForAndRemoveUndefinedDialogs(fullProfile: IAkiProfile): void;
    /**
     * Blank out the "test" mail message from prapor
     */
    protected removePraporTestMessage(): void;
    /**
     * Make non-trigger-spawned raiders spawn earlier + always
     */
    protected adjustLabsRaiderSpawnRate(): void;
    protected logProfileDetails(fullProfile: IAkiProfile): void;
}
