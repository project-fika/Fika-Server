import { ApplicationContext } from "@spt/context/ApplicationContext";
import { LocationLootGenerator } from "@spt/generators/LocationLootGenerator";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { HealthHelper } from "@spt/helpers/HealthHelper";
import { InRaidHelper } from "@spt/helpers/InRaidHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IEndOfflineRaidRequestData } from "@spt/models/eft/match/IEndOfflineRaidRequestData";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { IMatchConfig } from "@spt/models/spt/config/IMatchConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { InsuranceService } from "@spt/services/InsuranceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { MatchBotDetailsCacheService } from "@spt/services/MatchBotDetailsCacheService";
import { PmcChatResponseService } from "@spt/services/PmcChatResponseService";
import { RaidTimeAdjustmentService } from "@spt/services/RaidTimeAdjustmentService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class LegacyLocationLifecycleService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected profileHelper: ProfileHelper;
    protected databaseService: DatabaseService;
    protected inRaidHelper: InRaidHelper;
    protected healthHelper: HealthHelper;
    protected matchBotDetailsCacheService: MatchBotDetailsCacheService;
    protected pmcChatResponseService: PmcChatResponseService;
    protected playerScavGenerator: PlayerScavGenerator;
    protected traderHelper: TraderHelper;
    protected localisationService: LocalisationService;
    protected insuranceService: InsuranceService;
    protected botLootCacheService: BotLootCacheService;
    protected configServer: ConfigServer;
    protected botGenerationCacheService: BotGenerationCacheService;
    protected mailSendService: MailSendService;
    protected raidTimeAdjustmentService: RaidTimeAdjustmentService;
    protected lootGenerator: LootGenerator;
    protected applicationContext: ApplicationContext;
    protected locationLootGenerator: LocationLootGenerator;
    protected cloner: ICloner;
    protected matchConfig: IMatchConfig;
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, saveServer: SaveServer, timeUtil: TimeUtil, randomUtil: RandomUtil, profileHelper: ProfileHelper, databaseService: DatabaseService, inRaidHelper: InRaidHelper, healthHelper: HealthHelper, matchBotDetailsCacheService: MatchBotDetailsCacheService, pmcChatResponseService: PmcChatResponseService, playerScavGenerator: PlayerScavGenerator, traderHelper: TraderHelper, localisationService: LocalisationService, insuranceService: InsuranceService, botLootCacheService: BotLootCacheService, configServer: ConfigServer, botGenerationCacheService: BotGenerationCacheService, mailSendService: MailSendService, raidTimeAdjustmentService: RaidTimeAdjustmentService, lootGenerator: LootGenerator, applicationContext: ApplicationContext, locationLootGenerator: LocationLootGenerator, cloner: ICloner);
    /**
     * Handle client/match/offline/end
     * @deprecated
     */
    endOfflineRaid(info: IEndOfflineRaidRequestData, sessionId: string): void;
    /**
     * Handle when a player extracts using a car - Add rep to fence
     * @param extractName name of the extract used
     * @param pmcData Player profile
     * @param sessionId Session id
     */
    protected handleCarExtract(extractName: string, pmcData: IPmcData, sessionId: string): void;
    /**
     * Get the fence rep gain from using a car or coop extract
     * @param pmcData Profile
     * @param baseGain amount gained for the first extract
     * @param extractCount Number of times extract was taken
     * @returns Fence standing after taking extract
     */
    protected getFenceStandingAfterExtract(pmcData: IPmcData, baseGain: number, extractCount: number): number;
    /**
     * Was extract by car
     * @param extractName name of extract
     * @returns true if car extract
     */
    protected extractWasViaCar(extractName: string): boolean;
    /**
     * Did player take a COOP extract
     * @param extractName Name of extract player took
     * @returns True if coop extract
     */
    protected extractWasViaCoop(extractName: string): boolean;
    /**
     * Handle when a player extracts using a coop extract - add rep to fence
     * @param sessionId Session/player id
     * @param pmcData Profile
     * @param extractName Name of extract taken
     */
    protected handleCoopExtract(sessionId: string, pmcData: IPmcData, extractName: string): void;
    protected sendCoopTakenFenceMessage(sessionId: string): void;
}
