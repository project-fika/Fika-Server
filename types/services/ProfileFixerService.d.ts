import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RewardHelper } from "@spt/helpers/RewardHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBonus, IHideoutSlot } from "@spt/models/eft/common/tables/IBotBase";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IReward } from "@spt/models/eft/common/tables/IReward";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IStageBonus } from "@spt/models/eft/hideout/IHideoutArea";
import { IEquipmentBuild, IMagazineBuild, ISptProfile, IWeaponBuild } from "@spt/models/eft/profile/ISptProfile";
import { HideoutAreas } from "@spt/models/enums/HideoutAreas";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { Watermark } from "@spt/utils/Watermark";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ProfileFixerService {
    protected logger: ILogger;
    protected watermark: Watermark;
    protected databaseService: DatabaseService;
    protected hideoutHelper: HideoutHelper;
    protected inventoryHelper: InventoryHelper;
    protected traderHelper: TraderHelper;
    protected profileHelper: ProfileHelper;
    protected itemHelper: ItemHelper;
    protected localisationService: LocalisationService;
    protected timeUtil: TimeUtil;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected rewardHelper: RewardHelper;
    protected coreConfig: ICoreConfig;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, watermark: Watermark, databaseService: DatabaseService, hideoutHelper: HideoutHelper, inventoryHelper: InventoryHelper, traderHelper: TraderHelper, profileHelper: ProfileHelper, itemHelper: ItemHelper, localisationService: LocalisationService, timeUtil: TimeUtil, jsonUtil: JsonUtil, hashUtil: HashUtil, configServer: ConfigServer, cloner: ICloner, rewardHelper: RewardHelper);
    /**
     * Find issues in the pmc profile data that may cause issues and fix them
     * @param pmcProfile profile to check and fix
     */
    checkForAndFixPmcProfileIssues(pmcProfile: IPmcData): void;
    /**
     * Resolve any dialogue attachments that were accidentally created using the player's equipment ID as
     * the stash root object ID
     * @param fullProfile
     */
    checkForAndFixDialogueAttachments(fullProfile: ISptProfile): void;
    /**
     * Find issues in the scav profile data that may cause issues
     * @param scavProfile profile to check and fix
     */
    checkForAndFixScavProfileIssues(scavProfile: IPmcData): void;
    /**
     * Attempt to fix common item issues that corrupt profiles
     * @param pmcProfile Profile to check items of
     */
    fixProfileBreakingInventoryItemIssues(pmcProfile: IPmcData): void;
    /**
     * TODO - make this non-public - currently used by RepeatableQuestController
     * Remove unused condition counters
     * @param pmcProfile profile to remove old counters from
     */
    removeDanglingConditionCounters(pmcProfile: IPmcData): void;
    /**
     * Repeatable quests leave behind TaskConditionCounter objects that make the profile bloat with time, remove them
     * @param pmcProfile Player profile to check
     */
    protected removeDanglingTaskConditionCounters(pmcProfile: IPmcData): void;
    protected getActiveRepeatableQuests(repeatableQuests: IPmcDataRepeatableQuest[]): IRepeatableQuest[];
    /**
     * After removing mods that add quests, the quest panel will break without removing these
     * @param pmcProfile Profile to remove dead quests from
     */
    protected removeOrphanedQuests(pmcProfile: IPmcData): void;
    /**
     * Verify that all quest production unlocks have been applied to the PMC Profile
     * @param pmcProfile The profile to validate quest productions for
     */
    protected verifyQuestProductionUnlocks(pmcProfile: IPmcData): void;
    /**
     * Validate that the given profile has the given quest reward production scheme unlocked, and add it if not
     * @param pmcProfile Profile to check
     * @param productionUnlockReward The quest reward to validate
     * @param questDetails The quest the reward belongs to
     * @returns
     */
    protected verifyQuestProductionUnlock(pmcProfile: IPmcData, productionUnlockReward: IReward, questDetails: IQuest): void;
    /**
     * Initial release of SPT 3.10 used an incorrect favorites structure, reformat
     * the structure to the correct MongoID array structure
     * @param pmcProfile
     */
    protected fixFavorites(pmcProfile: IPmcData): void;
    /**
     * Remove any entries from `pmcProfile.InsuredItems` that do not have a corresponding
     * `pmcProfile.Inventory.items` entry
     * @param pmcProfile
     */
    protected fixOrphanedInsurance(pmcProfile: IPmcData): void;
    /**
     * If the profile has elite Hideout Managment skill, add the additional slots from globals
     * NOTE: This seems redundant, but we will leave it here just incase.
     * @param pmcProfile profile to add slots to
     */
    protected addHideoutEliteSlots(pmcProfile: IPmcData): void;
    /**
     * add in objects equal to the number of slots
     * @param areaType area to check
     * @param pmcProfile profile to update
     */
    protected addEmptyObjectsToHideoutAreaSlots(areaType: HideoutAreas, emptyItemCount: number, pmcProfile: IPmcData): void;
    protected addObjectsToArray(count: number, slots: IHideoutSlot[]): IHideoutSlot[];
    /**
     * Check for and cap profile skills at 5100.
     * @param pmcProfile profile to check and fix
     */
    protected checkForSkillsOverMaxLevel(pmcProfile: IPmcData): void;
    /**
     * Checks profile inventiory for items that do not exist inside the items db
     * @param sessionId Session id
     * @param pmcProfile Profile to check inventory of
     */
    checkForOrphanedModdedItems(sessionId: string, fullProfile: ISptProfile): void;
    /**
     * @param buildType The type of build, used for logging only
     * @param build The build to check for invalid items
     * @param itemsDb The items database to use for item lookup
     * @returns True if the build should be removed from the build list, false otherwise
     */
    protected shouldRemoveWeaponEquipmentBuild(buildType: string, build: IWeaponBuild | IEquipmentBuild, itemsDb: Record<string, ITemplateItem>): boolean;
    /**
     * @param magazineBuild The magazine build to check for validity
     * @param itemsDb The items database to use for item lookup
     * @returns True if the build should be removed from the build list, false otherwise
     */
    protected shouldRemoveMagazineBuild(magazineBuild: IMagazineBuild, itemsDb: Record<string, ITemplateItem>): boolean;
    /**
     * REQUIRED for dev profiles
     * Iterate over players hideout areas and find what's build, look for missing bonuses those areas give and add them if missing
     * @param pmcProfile Profile to update
     */
    addMissingHideoutBonusesToProfile(pmcProfile: IPmcData): void;
    /**
     * @param profileBonuses bonuses from profile
     * @param bonus bonus to find
     * @returns matching bonus
     */
    protected getBonusFromProfile(profileBonuses: IBonus[], bonus: IStageBonus): IBonus | undefined;
    checkForAndRemoveInvalidTraders(fullProfile: ISptProfile): void;
}
