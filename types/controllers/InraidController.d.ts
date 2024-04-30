import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { PlayerScavGenerator } from "@spt-aki/generators/PlayerScavGenerator";
import { HealthHelper } from "@spt-aki/helpers/HealthHelper";
import { InRaidHelper } from "@spt-aki/helpers/InRaidHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IRegisterPlayerRequestData } from "@spt-aki/models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";
import { PlayerRaidEndState } from "@spt-aki/models/enums/PlayerRaidEndState";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IBTRConfig } from "@spt-aki/models/spt/config/IBTRConfig";
import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ITraderServiceModel } from "@spt-aki/models/spt/services/ITraderServiceModel";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { InsuranceService } from "@spt-aki/services/InsuranceService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { MatchBotDetailsCacheService } from "@spt-aki/services/MatchBotDetailsCacheService";
import { PmcChatResponseService } from "@spt-aki/services/PmcChatResponseService";
import { TraderServicesService } from "@spt-aki/services/TraderServicesService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
/**
 * Logic for handling In Raid callbacks
 */
export declare class InraidController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    protected pmcChatResponseService: PmcChatResponseService;
    protected matchBotDetailsCacheService: MatchBotDetailsCacheService;
    protected questHelper: QuestHelper;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected playerScavGenerator: PlayerScavGenerator;
    protected healthHelper: HealthHelper;
    protected traderHelper: TraderHelper;
    protected traderServicesService: TraderServicesService;
    protected insuranceService: InsuranceService;
    protected inRaidHelper: InRaidHelper;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected mailSendService: MailSendService;
    protected randomUtil: RandomUtil;
    protected airdropConfig: IAirdropConfig;
    protected btrConfig: IBTRConfig;
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected locationConfig: ILocationConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, saveServer: SaveServer, jsonUtil: JsonUtil, timeUtil: TimeUtil, databaseServer: DatabaseServer, pmcChatResponseService: PmcChatResponseService, matchBotDetailsCacheService: MatchBotDetailsCacheService, questHelper: QuestHelper, itemHelper: ItemHelper, profileHelper: ProfileHelper, playerScavGenerator: PlayerScavGenerator, healthHelper: HealthHelper, traderHelper: TraderHelper, traderServicesService: TraderServicesService, insuranceService: InsuranceService, inRaidHelper: InRaidHelper, applicationContext: ApplicationContext, configServer: ConfigServer, mailSendService: MailSendService, randomUtil: RandomUtil);
    /**
     * Save locationId to active profiles inraid object AND app context
     * @param sessionID Session id
     * @param info Register player request
     */
    addPlayer(sessionID: string, info: IRegisterPlayerRequestData): void;
    /**
     * Handle raid/profile/save
     * Save profile state to disk
     * Handles pmc/pscav
     * @param offraidData post-raid request data
     * @param sessionID Session id
     */
    savePostRaidProgress(offraidData: ISaveProgressRequestData, sessionID: string): void;
    /**
     * Handle updating player profile post-pmc raid
     * @param sessionID Session id
     * @param postRaidRequest Post-raid data
     */
    protected savePmcProgress(sessionID: string, postRaidRequest: ISaveProgressRequestData): void;
    /**
     * Make changes to PMC profile after they've died in raid,
     * Alter body part hp, handle insurance, delete inventory items, remove carried quest items
     * @param postRaidSaveRequest Post-raid save request
     * @param pmcData Pmc profile
     * @param sessionID Session id
     * @returns Updated profile object
     */
    protected performPostRaidActionsWhenDead(postRaidSaveRequest: ISaveProgressRequestData, pmcData: IPmcData, sessionID: string): IPmcData;
    /**
     * Adjust player characters body part hp post-raid
     * @param postRaidSaveRequest post raid data
     * @param pmcData player profile
     */
    protected updatePmcHealthPostRaid(postRaidSaveRequest: ISaveProgressRequestData, pmcData: IPmcData): void;
    /**
     * Reduce body part hp to % of max
     * @param pmcData profile to edit
     * @param multiplier multiplier to apply to max health
     */
    protected reducePmcHealthToPercent(pmcData: IPmcData, multiplier: number): void;
    /**
     * Handle updating the profile post-pscav raid
     * @param sessionID Session id
     * @param postRaidRequest Post-raid data of raid
     */
    protected savePlayerScavProgress(sessionID: string, postRaidRequest: ISaveProgressRequestData): void;
    /**
     * merge two dictionaries together
     * Prioritise pair that has true as a value
     * @param primary main dictionary
     * @param secondary Secondary dictionary
     */
    protected mergePmcAndScavEncyclopedias(primary: IPmcData, secondary: IPmcData): void;
    /**
     * Post-scav-raid any charisma increase must be propigated into PMC profile
     * @param postRaidServerScavProfile Scav profile after adjustments made from raid
     * @param postRaidServerPmcProfile Pmc profile after raid
     * @param preRaidScavCharismaProgress charisma progress value pre-raid
     */
    protected updatePmcCharismaSkillPostScavRaid(postRaidServerScavProfile: IPmcData, postRaidServerPmcProfile: IPmcData, preRaidScavCharismaProgress: number): void;
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
    /**
     * Is the player dead after a raid - dead is anything other than "survived" / "runner"
     * @param statusOnExit exit value from offraidData object
     * @returns true if dead
     */
    protected isPlayerDead(statusOnExit: PlayerRaidEndState): boolean;
    /**
     * Mark inventory items as FiR if player survived raid, otherwise remove FiR from them
     * @param offraidData Save Progress Request
     */
    protected markOrRemoveFoundInRaidItems(offraidData: ISaveProgressRequestData): void;
    /**
     * Update profile after player completes scav raid
     * @param scavData Scav profile
     * @param sessionID Session id
     * @param offraidData Post-raid save request
     * @param pmcData Pmc profile
     * @param isDead Is player dead
     */
    protected handlePostRaidPlayerScavProcess(scavData: IPmcData, sessionID: string, offraidData: ISaveProgressRequestData, pmcData: IPmcData, isDead: boolean): void;
    /**
     * Update profile with scav karma values based on in-raid actions
     * @param pmcData Pmc profile
     * @param offraidData Post-raid save request
     * @param scavData Scav profile
     */
    protected handlePostRaidPlayerScavKarmaChanges(pmcData: IPmcData, offraidData: ISaveProgressRequestData, scavData: IPmcData): void;
    /**
     * Get the inraid config from configs/inraid.json
     * @returns InRaid Config
     */
    getInraidConfig(): IInRaidConfig;
    /**
     * Get airdrop config from configs/airdrop.json
     * @returns Airdrop config
     */
    getAirdropConfig(): IAirdropConfig;
    /**
     * Get BTR config from configs/btr.json
     * @returns Airdrop config
     */
    getBTRConfig(): IBTRConfig;
    /**
     * Handle singleplayer/traderServices/getTraderServices
     * @returns Trader services data
     */
    getTraderServices(sessionId: string, traderId: string): ITraderServiceModel[];
    /**
     * Handle singleplayer/traderServices/itemDelivery
     */
    itemDelivery(sessionId: string, traderId: string, items: Item[]): void;
    getTraitorScavHostileChance(url: string, sessionID: string): number;
    getSandboxMaxPatrolValue(url: string, sessionID: string): number;
}
