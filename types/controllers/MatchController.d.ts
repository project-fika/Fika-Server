import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IEndOfflineRaidRequestData } from "@spt-aki/models/eft/match/IEndOfflineRaidRequestData";
import { IGetGroupStatusRequestData } from "@spt-aki/models/eft/match/IGetGroupStatusRequestData";
import { IGetGroupStatusResponse } from "@spt-aki/models/eft/match/IGetGroupStatusResponse";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { IJoinMatchRequestData } from "@spt-aki/models/eft/match/IJoinMatchRequestData";
import { IJoinMatchResult } from "@spt-aki/models/eft/match/IJoinMatchResult";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { IMatchConfig } from "@spt-aki/models/spt/config/IMatchConfig";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { BotGenerationCacheService } from "@spt-aki/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { MatchLocationService } from "@spt-aki/services/MatchLocationService";
import { ProfileSnapshotService } from "@spt-aki/services/ProfileSnapshotService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class MatchController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected profileHelper: ProfileHelper;
    protected matchLocationService: MatchLocationService;
    protected traderHelper: TraderHelper;
    protected botLootCacheService: BotLootCacheService;
    protected configServer: ConfigServer;
    protected profileSnapshotService: ProfileSnapshotService;
    protected botGenerationCacheService: BotGenerationCacheService;
    protected mailSendService: MailSendService;
    protected lootGenerator: LootGenerator;
    protected applicationContext: ApplicationContext;
    protected matchConfig: IMatchConfig;
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, saveServer: SaveServer, timeUtil: TimeUtil, randomUtil: RandomUtil, hashUtil: HashUtil, profileHelper: ProfileHelper, matchLocationService: MatchLocationService, traderHelper: TraderHelper, botLootCacheService: BotLootCacheService, configServer: ConfigServer, profileSnapshotService: ProfileSnapshotService, botGenerationCacheService: BotGenerationCacheService, mailSendService: MailSendService, lootGenerator: LootGenerator, applicationContext: ApplicationContext);
    getEnabled(): boolean;
    /** Handle client/match/group/delete */
    deleteGroup(info: any): void;
    /** Handle match/group/start_game */
    joinMatch(info: IJoinMatchRequestData, sessionId: string): IJoinMatchResult;
    /** Handle client/match/group/status */
    getGroupStatus(info: IGetGroupStatusRequestData): IGetGroupStatusResponse;
    /**
     * Handle /client/raid/configuration
     * @param request Raid config request
     * @param sessionID Session id
     */
    startOfflineRaid(request: IGetRaidConfigurationRequestData, sessionID: string): void;
    /**
     * Convert a difficulty value from pre-raid screen to a bot difficulty
     * @param botDifficulty dropdown difficulty value
     * @returns bot difficulty
     */
    protected convertDifficultyDropdownIntoBotDifficulty(botDifficulty: string): string;
    /** Handle client/match/offline/end */
    endOfflineRaid(info: IEndOfflineRaidRequestData, sessionId: string): void;
    /**
     * Did player take a COOP extract
     * @param extractName Name of extract player took
     * @returns True if coop extract
     */
    protected extractWasViaCoop(extractName: string): boolean;
    protected sendCoopTakenFenceMessage(sessionId: string): void;
    /**
     * Handle when a player extracts using a coop extract - add rep to fence
     * @param pmcData Profile
     * @param extractName Name of extract taken
     */
    protected handleCoopExtract(pmcData: IPmcData, extractName: string): void;
    /**
     * Was extract by car
     * @param extractName name of extract
     * @returns true if car extract
     */
    protected extractWasViaCar(extractName: string): boolean;
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
}
