import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PaymentHelper } from "@spt-aki/helpers/PaymentHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { IPmcData, IPostRaidPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IQuestStatus, TraderInfo } from "@spt-aki/models/eft/common/tables/IBotBase";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { ILostOnDeathConfig } from "@spt-aki/models/spt/config/ILostOnDeathConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { ProfileFixerService } from "@spt-aki/services/ProfileFixerService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
import { ProfileHelper } from "./ProfileHelper";
export declare class InRaidHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected jsonUtil: JsonUtil;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected inventoryHelper: InventoryHelper;
    protected profileHelper: ProfileHelper;
    protected questHelper: QuestHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected profileFixerService: ProfileFixerService;
    protected configServer: ConfigServer;
    protected randomUtil: RandomUtil;
    protected lostOnDeathConfig: ILostOnDeathConfig;
    protected inRaidConfig: IInRaidConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, saveServer: SaveServer, jsonUtil: JsonUtil, itemHelper: ItemHelper, databaseServer: DatabaseServer, inventoryHelper: InventoryHelper, profileHelper: ProfileHelper, questHelper: QuestHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, profileFixerService: ProfileFixerService, configServer: ConfigServer, randomUtil: RandomUtil);
    /**
     * Lookup quest item loss from lostOnDeath config
     * @returns True if items should be removed from inventory
     */
    removeQuestItemsOnDeath(): boolean;
    /**
     * Check items array and add an upd object to money with a stack count of 1
     * Single stack money items have no upd object and thus no StackObjectsCount, causing issues
     * @param items Items array to check
     */
    addUpdToMoneyFromRaid(items: Item[]): void;
    /**
     * Reset a profile to a baseline, used post-raid
     * Reset points earned during session property
     * Increment exp
     * @param profileData Profile to update
     * @param saveProgressRequest post raid save data request data
     * @param sessionID Session id
     * @returns Reset profile object
     */
    updateProfileBaseStats(profileData: IPmcData, saveProgressRequest: ISaveProgressRequestData, sessionID: string): void;
    /**
     * Reset the skill points earned in a raid to 0, ready for next raid
     * @param profile Profile to update
     */
    protected resetSkillPointsEarnedDuringRaid(profile: IPmcData): void;
    /** Check counters are correct in profile */
    protected validateTaskConditionCounters(saveProgressRequest: ISaveProgressRequestData, profileData: IPmcData): void;
    /**
     * Update various serverPMC profile values; quests/limb hp/trader standing with values post-raic
     * @param pmcData Server PMC profile
     * @param saveProgressRequest Post-raid request data
     * @param sessionId Session id
     */
    updatePmcProfileDataPostRaid(pmcData: IPmcData, saveProgressRequest: ISaveProgressRequestData, sessionId: string): void;
    /**
     * Update scav quest values on server profile with updated values post-raid
     * @param scavData Server scav profile
     * @param saveProgressRequest Post-raid request data
     * @param sessionId Session id
     */
    updateScavProfileDataPostRaid(scavData: IPmcData, saveProgressRequest: ISaveProgressRequestData, sessionId: string): void;
    /**
     * Look for quests with a status different from what it began the raid with
     * @param sessionId Player id
     * @param pmcData Player profile
     * @param preRaidQuests Quests prior to starting raid
     * @param postRaidProfile Profile sent by client with post-raid quests
     */
    protected processAlteredQuests(sessionId: string, pmcData: IPmcData, preRaidQuests: IQuestStatus[], postRaidProfile: IPostRaidPmcData): void;
    /**
     * Take body part effects from client profile and apply to server profile
     * @param saveProgressRequest post-raid request
     * @param profileData player profile on server
     */
    protected transferPostRaidLimbEffectsToProfile(saveProgressRequest: ISaveProgressRequestData, profileData: IPmcData): void;
    /**
     * Adjust server trader settings if they differ from data sent by client
     * @param tradersServerProfile Server
     * @param tradersClientProfile Client
     */
    protected applyTraderStandingAdjustments(tradersServerProfile: Record<string, TraderInfo>, tradersClientProfile: Record<string, TraderInfo>): void;
    /**
     * Transfer client achievements into profile
     * @param profile Player pmc profile
     * @param clientAchievements Achievements from client
     */
    protected updateProfileAchievements(profile: IPmcData, clientAchievements: Record<string, number>): void;
    /**
     * Set the SPT inraid location Profile property to 'none'
     * @param sessionID Session id
     */
    protected setPlayerInRaidLocationStatusToNone(sessionID: string): void;
    /**
     * Iterate over inventory items and remove the property that defines an item as Found in Raid
     * Only removes property if item had FiR when entering raid
     * @param postRaidProfile profile to update items for
     * @returns Updated profile with SpawnedInSession removed
     */
    removeSpawnedInSessionPropertyFromItems(postRaidProfile: IPostRaidPmcData): IPostRaidPmcData;
    /**
     * Update a players inventory post-raid
     * Remove equipped items from pre-raid
     * Add new items found in raid to profile
     * Store insurance items in profile
     * @param sessionID Session id
     * @param serverProfile Profile to update
     * @param postRaidProfile Profile returned by client after a raid
     */
    setInventory(sessionID: string, serverProfile: IPmcData, postRaidProfile: IPmcData): void;
    /**
     * Clear PMC inventory of all items except those that are exempt
     * Used post-raid to remove items after death
     * @param pmcData Player profile
     * @param sessionId Session id
     */
    deleteInventory(pmcData: IPmcData, sessionId: string): void;
    /**
     * Get an array of items from a profile that will be lost on death
     * @param pmcProfile Profile to get items from
     * @returns Array of items lost on death
     */
    protected getInventoryItemsLostOnDeath(pmcProfile: IPmcData): Item[];
    /**
     * Get items in vest/pocket/backpack inventory containers (excluding children)
     * @param pmcData Player profile
     * @returns Item array
     */
    protected getBaseItemsInRigPocketAndBackpack(pmcData: IPmcData): Item[];
    /**
     * Does the provided items slotId mean its kept on the player after death
     * @pmcData Player profile
     * @itemToCheck Item to check should be kept
     * @returns true if item is kept after death
     */
    protected isItemKeptAfterDeath(pmcData: IPmcData, itemToCheck: Item): boolean;
    /**
     * Return the equipped items from a players inventory
     * @param items Players inventory to search through
     * @returns an array of equipped items
     */
    getPlayerGear(items: Item[]): Item[];
}
