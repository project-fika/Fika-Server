import { ApplicationContext } from "@spt/context/ApplicationContext";
import { LocationLootGenerator } from "@spt/generators/LocationLootGenerator";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { HealthHelper } from "@spt/helpers/HealthHelper";
import { InRaidHelper } from "@spt/helpers/InRaidHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, TraderInfo } from "@spt/models/eft/common/tables/IBotBase";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IEndLocalRaidRequestData, IEndRaidResult } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
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
export declare class LocationLifecycleService {
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
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, saveServer: SaveServer, timeUtil: TimeUtil, randomUtil: RandomUtil, profileHelper: ProfileHelper, databaseService: DatabaseService, inRaidHelper: InRaidHelper, healthHelper: HealthHelper, matchBotDetailsCacheService: MatchBotDetailsCacheService, pmcChatResponseService: PmcChatResponseService, playerScavGenerator: PlayerScavGenerator, traderHelper: TraderHelper, localisationService: LocalisationService, insuranceService: InsuranceService, botLootCacheService: BotLootCacheService, configServer: ConfigServer, botGenerationCacheService: BotGenerationCacheService, mailSendService: MailSendService, raidTimeAdjustmentService: RaidTimeAdjustmentService, lootGenerator: LootGenerator, applicationContext: ApplicationContext, locationLootGenerator: LocationLootGenerator, cloner: ICloner);
    startLocalRaid(sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData;
    /**
     * Generate a maps base location and loot
     * @param name Map name
     * @returns ILocationBase
     */
    protected generateLocationAndLoot(name: string): ILocationBase;
    endLocalRaid(sessionId: string, request: IEndLocalRaidRequestData): void;
    /**
     * Was extract by car
     * @param extractName name of extract
     * @returns True if extract was by car
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
     * Handle when a player extracts using a coop extract - add rep to fence
     * @param sessionId Session/player id
     * @param pmcData Profile
     * @param extractName Name of extract taken
     */
    protected handleCoopExtract(sessionId: string, pmcData: IPmcData, extractName: string): void;
    /**
     * Get the fence rep gain from using a car or coop extract
     * @param pmcData Profile
     * @param baseGain amount gained for the first extract
     * @param extractCount Number of times extract was taken
     * @returns Fence standing after taking extract
     */
    protected getFenceStandingAfterExtract(pmcData: IPmcData, baseGain: number, extractCount: number): number;
    protected sendCoopTakenFenceMessage(sessionId: string): void;
    /**
     * Did player take a COOP extract
     * @param extractName Name of extract player took
     * @returns True if coop extract
     */
    protected extractTakenWasCoop(extractName: string): boolean;
    protected handlePostRaidPlayerScav(sessionId: string, pmcProfile: IPmcData, scavProfile: IPmcData, isDead: boolean, request: IEndLocalRaidRequestData): void;
    protected handlePostRaidPmc(sessionId: string, pmcProfile: IPmcData, scavProfile: IPmcData, postRaidProfile: IPmcData, isDead: boolean, request: IEndLocalRaidRequestData, locationName: string): void;
    /**
     * Adjust server trader settings if they differ from data sent by client
     * @param tradersServerProfile Server
     * @param tradersClientProfile Client
     */
    protected applyTraderStandingAdjustments(tradersServerProfile: Record<string, TraderInfo>, tradersClientProfile: Record<string, TraderInfo>): void;
    /**
     * Check if player used BTR item sending service and send items to player via mail if found
     * @param sessionId Session id
     * @param request End raid request
     */
    protected handleBTRItemTransferEvent(sessionId: string, request: IEndLocalRaidRequestData): void;
    protected btrItemDelivery(sessionId: string, traderId: string, items: Item[]): void;
    /**
     * Return the equipped items from a players inventory
     * @param items Players inventory to search through
     * @returns an array of equipped items
     */
    protected getEquippedGear(items: Item[]): Item[];
    /**
     * Is the player dead after a raid - dead = anything other than "survived" / "runner"
     * @param statusOnExit Exit value from offraidData object
     * @returns true if dead
     */
    protected isPlayerDead(results: IEndRaidResult): boolean;
    /**
     * Reset the skill points earned in a raid to 0, ready for next raid
     * @param commonSkills Profile common skills to update
     */
    protected resetSkillPointsEarnedDuringRaid(commonSkills: Common[]): void;
    /**
     * merge two dictionaries together
     * Prioritise pair that has true as a value
     * @param primary main dictionary
     * @param secondary Secondary dictionary
     */
    protected mergePmcAndScavEncyclopedias(primary: IPmcData, secondary: IPmcData): void;
}
