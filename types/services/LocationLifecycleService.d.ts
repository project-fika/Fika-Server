import { ApplicationContext } from "@spt/context/ApplicationContext";
import { LocationLootGenerator } from "@spt/generators/LocationLootGenerator";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { PmcWaveGenerator } from "@spt/generators/PmcWaveGenerator";
import { HealthHelper } from "@spt/helpers/HealthHelper";
import { InRaidHelper } from "@spt/helpers/InRaidHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { RewardHelper } from "@spt/helpers/RewardHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common, IQuestStatus, ITraderInfo } from "@spt/models/eft/common/tables/IBotBase";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IEndLocalRaidRequestData, IEndRaidResult } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { BotNameService } from "@spt/services/BotNameService";
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
import type { ICloner } from "@spt/utils/cloners/ICloner";
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
    protected questHelper: QuestHelper;
    protected rewardHelper: RewardHelper;
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
    protected botNameService: BotNameService;
    protected lootGenerator: LootGenerator;
    protected applicationContext: ApplicationContext;
    protected locationLootGenerator: LocationLootGenerator;
    protected pmcWaveGenerator: PmcWaveGenerator;
    protected cloner: ICloner;
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected locationConfig: ILocationConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, saveServer: SaveServer, timeUtil: TimeUtil, randomUtil: RandomUtil, profileHelper: ProfileHelper, databaseService: DatabaseService, inRaidHelper: InRaidHelper, healthHelper: HealthHelper, questHelper: QuestHelper, rewardHelper: RewardHelper, matchBotDetailsCacheService: MatchBotDetailsCacheService, pmcChatResponseService: PmcChatResponseService, playerScavGenerator: PlayerScavGenerator, traderHelper: TraderHelper, localisationService: LocalisationService, insuranceService: InsuranceService, botLootCacheService: BotLootCacheService, configServer: ConfigServer, botGenerationCacheService: BotGenerationCacheService, mailSendService: MailSendService, raidTimeAdjustmentService: RaidTimeAdjustmentService, botNameService: BotNameService, lootGenerator: LootGenerator, applicationContext: ApplicationContext, locationLootGenerator: LocationLootGenerator, pmcWaveGenerator: PmcWaveGenerator, cloner: ICloner);
    /** Handle client/match/local/start */
    startLocalRaid(sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData;
    /**
     * Replace map exits with scav exits when player is scavving
     * @param playerSide Playders side (savage/usec/bear)
     * @param location id of map being loaded
     * @param locationData Maps locationbase data
     */
    protected adjustExtracts(playerSide: string, location: string, locationData: ILocationBase): void;
    /**
     * Adjust the bot hostility values prior to entering a raid
     * @param location map to adjust values of
     */
    protected adjustBotHostilitySettings(location: ILocationBase): void;
    /**
     * Generate a maps base location (cloned) and loot
     * @param name Map name
     * @param generateLoot OPTIONAL - Should loot be generated for the map before being returned
     * @returns ILocationBase
     */
    protected generateLocationAndLoot(name: string, generateLoot?: boolean): ILocationBase;
    /** Handle client/match/local/end */
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
    protected handlePostRaidPlayerScav(sessionId: string, pmcProfile: IPmcData, scavProfile: IPmcData, isDead: boolean, isTransfer: boolean, request: IEndLocalRaidRequestData): void;
    /**
     *
     * @param sessionId Player id
     * @param fullProfile Full player profile
     * @param scavProfile Scav profile
     * @param isDead Player died/got left behind in raid
     * @param isSurvived Not same as opposite of `isDead`, specific status
     * @param request Client request
     * @param locationName name of location exited
     */
    protected handlePostRaidPmc(sessionId: string, fullProfile: ISptProfile, scavProfile: IPmcData, isDead: boolean, isSurvived: boolean, isTransfer: boolean, request: IEndLocalRaidRequestData, locationName: string): void;
    /**
     * Check for and add any rewards found via the gained achievements this raid
     * @param fullProfile Profile to add customisations to
     * @param postRaidAchievements All profile achievements at the end of the raid
     */
    protected processAchievementRewards(fullProfile: ISptProfile, postRaidAchievements: Record<string, number>): void;
    /**
     * On death Quest items are lost, the client does not clean up completed conditions for picking up those quest items,
     * If the completed conditions remain in the profile the player is unable to pick the item up again
     * @param sessionId Session id
     * @param lostQuestItems Quest items lost on player death
     * @param profileQuests Quest status data from player profile
     */
    protected checkForAndFixPickupQuestsAfterDeath(sessionId: string, lostQuestItems: IItem[], profileQuests: IQuestStatus[]): void;
    /**
     * In 0.15 Lightkeeper quests do not give rewards in PvE, this issue also occurs in spt
     * We check for newly completed Lk quests and run them through the servers `CompleteQuest` process
     * This rewards players with items + craft unlocks + new trader assorts
     * @param sessionId Session id
     * @param postRaidQuests Quest statuses post-raid
     * @param preRaidQuests Quest statuses pre-raid
     * @param pmcProfile Players profile
     */
    protected lightkeeperQuestWorkaround(sessionId: string, postRaidQuests: IQuestStatus[], preRaidQuests: IQuestStatus[], pmcProfile: IPmcData): void;
    /**
     * Convert post-raid quests into correct format
     * Quest status comes back as a string version of the enum `Success`, not the expected value of 1
     * @param questsToProcess quests data from client
     * @param preRaidQuestStatuses quest data from before raid
     * @returns IQuestStatus
     */
    protected processPostRaidQuests(questsToProcess: IQuestStatus[]): IQuestStatus[];
    /**
     * Adjust server trader settings if they differ from data sent by client
     * @param tradersServerProfile Server
     * @param tradersClientProfile Client
     */
    protected applyTraderStandingAdjustments(tradersServerProfile: Record<string, ITraderInfo>, tradersClientProfile: Record<string, ITraderInfo>): void;
    /**
     * Check if player used BTR or transit item sending service and send items to player via mail if found
     * @param sessionId Session id
     * @param request End raid request
     */
    protected handleItemTransferEvent(sessionId: string, request: IEndLocalRaidRequestData): void;
    protected transferItemDelivery(sessionId: string, traderId: string, items: IItem[]): void;
    protected handleInsuredItemLostEvent(sessionId: string, preRaidPmcProfile: IPmcData, request: IEndLocalRaidRequestData, locationName: string): void;
    /**
     * Return the equipped items from a players inventory
     * @param items Players inventory to search through
     * @returns an array of equipped items
     */
    protected getEquippedGear(items: IItem[]): IItem[];
    /**
     * Checks to see if player survives. run through will return false
     * @param statusOnExit Exit value from offraidData object
     * @returns true if Survived
     */
    protected isPlayerSurvived(results: IEndRaidResult): boolean;
    /**
     * Is the player dead after a raid - dead = anything other than "survived" / "runner"
     * @param results Post raid request
     * @returns true if dead
     */
    protected isPlayerDead(results: IEndRaidResult): boolean;
    /**
     * Has the player moved from one map to another
     * @param results Post raid request
     * @returns True if players transfered
     */
    protected isMapToMapTransfer(results: IEndRaidResult): boolean;
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
    /**
     * Does provided profile contain any condition counters
     * @param profile Profile to check for condition counters
     * @returns Profile has condition counters
     */
    protected profileHasConditionCounters(profile: IPmcData): boolean;
    /**
     * Scav quest progress isnt transferred automatically from scav to pmc, we do this manually
     * @param scavProfile Scav profile with quest progress post-raid
     * @param pmcProfile Server pmc profile to copy scav quest progress into
     */
    protected migrateScavQuestProgressToPmcProfile(scavProfile: IPmcData, pmcProfile: IPmcData): void;
}
