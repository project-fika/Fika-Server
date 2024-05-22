import { ApplicationContext } from "@spt/context/ApplicationContext";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IEndOfflineRaidRequestData } from "@spt/models/eft/match/IEndOfflineRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { IMatchConfig } from "@spt/models/spt/config/IMatchConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { MailSendService } from "@spt/services/MailSendService";
import { MatchLocationService } from "@spt/services/MatchLocationService";
import { ProfileSnapshotService } from "@spt/services/ProfileSnapshotService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
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
    joinMatch(info: IMatchGroupStartGameRequest, sessionId: string): IProfileStatusResponse;
    /** Handle client/match/group/status */
    getGroupStatus(info: IMatchGroupStatusRequest): IMatchGroupStatusResponse;
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
     * @param sessionId Session/player id
     * @param pmcData Profile
     * @param extractName Name of extract taken
     */
    protected handleCoopExtract(sessionId: string, pmcData: IPmcData, extractName: string): void;
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
