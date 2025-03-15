import { ApplicationContext } from "@spt/context/ApplicationContext";
import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RewardHelper } from "@spt/helpers/RewardHelper";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ICheckVersionResponse } from "@spt/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt/models/eft/game/IGameConfigResponse";
import { IGameKeepAliveResponse } from "@spt/models/eft/game/IGameKeepAliveResponse";
import { IGameModeRequestData } from "@spt/models/eft/game/IGameModeRequestData";
import { IGameModeResponse } from "@spt/models/eft/game/IGameModeResponse";
import { IGetRaidTimeRequest } from "@spt/models/eft/game/IGetRaidTimeRequest";
import { IGetRaidTimeResponse } from "@spt/models/eft/game/IGetRaidTimeResponse";
import { IServerDetails } from "@spt/models/eft/game/IServerDetails";
import { ISurveyResponseData } from "@spt/models/eft/game/ISurveyResponseData";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { CreateProfileService } from "@spt/services/CreateProfileService";
import { CustomLocationWaveService } from "@spt/services/CustomLocationWaveService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { GiftService } from "@spt/services/GiftService";
import { ItemBaseClassService } from "@spt/services/ItemBaseClassService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { OpenZoneService } from "@spt/services/OpenZoneService";
import { PostDbLoadService } from "@spt/services/PostDbLoadService";
import { ProfileActivityService } from "@spt/services/ProfileActivityService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { RaidTimeAdjustmentService } from "@spt/services/RaidTimeAdjustmentService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class GameController {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected preSptModLoader: PreSptModLoader;
    protected httpServerHelper: HttpServerHelper;
    protected inventoryHelper: InventoryHelper;
    protected rewardHelper: RewardHelper;
    protected randomUtil: RandomUtil;
    protected hideoutHelper: HideoutHelper;
    protected profileHelper: ProfileHelper;
    protected profileFixerService: ProfileFixerService;
    protected localisationService: LocalisationService;
    protected postDbLoadService: PostDbLoadService;
    protected createProfileService: CreateProfileService;
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
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, timeUtil: TimeUtil, hashUtil: HashUtil, preSptModLoader: PreSptModLoader, httpServerHelper: HttpServerHelper, inventoryHelper: InventoryHelper, rewardHelper: RewardHelper, randomUtil: RandomUtil, hideoutHelper: HideoutHelper, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, postDbLoadService: PostDbLoadService, createProfileService: CreateProfileService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, seasonalEventService: SeasonalEventService, itemBaseClassService: ItemBaseClassService, giftService: GiftService, raidTimeAdjustmentService: RaidTimeAdjustmentService, profileActivityService: ProfileActivityService, applicationContext: ApplicationContext, configServer: ConfigServer, cloner: ICloner);
    load(): void;
    /**
     * Handle client/game/start
     */
    gameStart(_url: string, _info: IEmptyRequestData, sessionID: string, startTimeStampMS: number): void;
    protected migrate310xProfile(fullProfile: ISptProfile): void;
    protected migrate39xProfile(fullProfile: ISptProfile): void;
    /**
     * Handle client/game/config
     */
    getGameConfig(sessionID: string): IGameConfigResponse;
    /**
     * Handle client/game/mode
     */
    getGameMode(sessionID: string, info: IGameModeRequestData): IGameModeResponse;
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
     * Players set botReload to a high value and don't expect the crazy fast reload speeds, give them a warn about it
     * @param pmcProfile Player profile
     */
    protected warnOnActiveBotReloadSkill(pmcProfile: IPmcData): void;
    /**
     * When player logs in, iterate over all active effects and reduce timer
     * @param pmcProfile Profile to adjust values for
     */
    protected updateProfileHealthValues(pmcProfile: IPmcData): void;
    /**
     * Send starting gifts to profile after x days
     * @param pmcProfile Profile to add gifts to
     */
    protected sendPraporGiftsToNewProfiles(pmcProfile: IPmcData): void;
    /**
     * Mechanic sends players a measuring tape on profile start for some reason
     * @param pmcProfile Player profile
     */
    protected sendMechanicGiftsToNewProfile(pmcProfile: IPmcData): void;
    /**
     * Get a list of installed mods and save their details to the profile being used
     * @param fullProfile Profile to add mod details to
     */
    protected saveActiveModsToProfile(fullProfile: ISptProfile): void;
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
    protected logProfileDetails(fullProfile: ISptProfile): void;
    getSurvey(sessionId: string): ISurveyResponseData;
}
