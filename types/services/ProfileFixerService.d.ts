import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Bonus, HideoutSlot } from "@spt/models/eft/common/tables/IBotBase";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { StageBonus } from "@spt/models/eft/hideout/IHideoutArea";
import { ISptProfile, IEquipmentBuild, IMagazineBuild, IWeaponBuild } from "@spt/models/eft/profile/ISptProfile";
import { HideoutAreas } from "@spt/models/enums/HideoutAreas";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { Watermark } from "@spt/utils/Watermark";
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
    protected coreConfig: ICoreConfig;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, watermark: Watermark, databaseService: DatabaseService, hideoutHelper: HideoutHelper, inventoryHelper: InventoryHelper, traderHelper: TraderHelper, profileHelper: ProfileHelper, itemHelper: ItemHelper, localisationService: LocalisationService, timeUtil: TimeUtil, jsonUtil: JsonUtil, hashUtil: HashUtil, configServer: ConfigServer, cloner: ICloner);
    /**
     * Find issues in the pmc profile data that may cause issues and fix them
     * @param pmcProfile profile to check and fix
     */
    checkForAndFixPmcProfileIssues(pmcProfile: IPmcData): void;
    /**
     * Find issues in the scav profile data that may cause issues
     * @param scavProfile profile to check and fix
     */
    checkForAndFixScavProfileIssues(scavProfile: IPmcData): void;
    protected addMissingGunStandContainerImprovements(pmcProfile: IPmcData): void;
    protected addMissingHallOfFameContainerImprovements(pmcProfile: IPmcData): void;
    protected ensureGunStandLevelsMatch(pmcProfile: IPmcData): void;
    protected addHideoutAreaStashes(pmcProfile: IPmcData): void;
    protected addMissingHideoutWallAreas(pmcProfile: IPmcData): void;
    /**
     * Add tag to profile to indicate when it was made
     * @param fullProfile
     */
    addMissingSptVersionTagToProfile(fullProfile: ISptProfile): void;
    /**
     * TODO - make this non-public - currently used by RepeatableQuestController
     * Remove unused condition counters
     * @param pmcProfile profile to remove old counters from
     */
    removeDanglingConditionCounters(pmcProfile: IPmcData): void;
    addLighthouseKeeperIfMissing(pmcProfile: IPmcData): void;
    protected addUnlockedInfoObjectIfMissing(pmcProfile: IPmcData): void;
    /**
     * Repeatable quests leave behind TaskConditionCounter objects that make the profile bloat with time, remove them
     * @param pmcProfile Player profile to check
     */
    protected removeDanglingTaskConditionCounters(pmcProfile: IPmcData): void;
    protected getActiveRepeatableQuests(repeatableQuests: IPmcDataRepeatableQuest[]): IRepeatableQuest[];
    protected fixNullTraderSalesSums(pmcProfile: IPmcData): void;
    protected addMissingBonusesProperty(pmcProfile: IPmcData): void;
    /**
     * Adjust profile quest status and statusTimers object values
     * quest.status is numeric e.g. 2
     * quest.statusTimers keys are numeric as strings e.g. "2"
     * @param profile profile to update
     */
    protected updateProfileQuestDataValues(profile: IPmcData): void;
    protected addMissingRepeatableQuestsProperty(pmcProfile: IPmcData): void;
    /**
     * Some profiles have hideout maxed and therefore no improvements
     * @param pmcProfile Profile to add improvement data to
     */
    protected addMissingWallImprovements(pmcProfile: IPmcData): void;
    /**
     * A new property was added to slot items "locationIndex", if this is missing, the hideout slot item must be removed
     * @param pmcProfile Profile to find and remove slots from
     */
    protected removeResourcesFromSlotsInHideoutWithoutLocationIndexValue(pmcProfile: IPmcData): void;
    /**
     * Hideout slots need to be in a specific order, locationIndex in ascending order
     * @param pmcProfile profile to edit
     */
    protected reorderHideoutAreasWithResouceInputs(pmcProfile: IPmcData): void;
    /**
     * add in objects equal to the number of slots
     * @param areaType area to check
     * @param pmcProfile profile to update
     */
    protected addEmptyObjectsToHideoutAreaSlots(areaType: HideoutAreas, emptyItemCount: number, pmcProfile: IPmcData): void;
    protected addObjectsToArray(count: number, slots: HideoutSlot[]): HideoutSlot[];
    /**
     * Iterate over players hideout areas and find what's build, look for missing bonuses those areas give and add them if missing
     * @param pmcProfile Profile to update
     */
    addMissingHideoutBonusesToProfile(pmcProfile: IPmcData): void;
    /**
     * @param profileBonuses bonuses from profile
     * @param bonus bonus to find
     * @returns matching bonus
     */
    protected getBonusFromProfile(profileBonuses: Bonus[], bonus: StageBonus): Bonus | undefined;
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
     * Attempt to fix common item issues that corrupt profiles
     * @param pmcProfile Profile to check items of
     */
    fixProfileBreakingInventoryItemIssues(pmcProfile: IPmcData): void;
    /**
     * Add `Improvements` object to hideout if missing - added in eft 13.0.21469
     * @param pmcProfile profile to update
     */
    addMissingUpgradesPropertyToHideout(pmcProfile: IPmcData): void;
    /**
     * Iterate over associated profile template and check all hideout areas exist, add if not
     * @param fullProfile Profile to update
     */
    addMissingHideoutAreasToProfile(fullProfile: ISptProfile): void;
    /**
     * These used to be used for storing scav case rewards, rewards are now generated on pickup
     * @param pmcProfile Profile to update
     */
    removeLegacyScavCaseProductionCrafts(pmcProfile: IPmcData): void;
    /**
     * 3.7.0 moved AIDs to be numeric, old profiles need to be migrated
     * We store the old AID value in new field `sessionId`
     * @param fullProfile Profile to update
     */
    fixIncorrectAidValue(fullProfile: ISptProfile): void;
    /**
     * Bsg nested `stats` into a sub object called 'eft'
     * @param fullProfile Profile to check for and migrate stats data
     */
    migrateStatsToNewStructure(fullProfile: ISptProfile): void;
    /**
     * 26126 (7th August) requires bonuses to have an ID, these were not included in the default profile presets
     * @param pmcProfile Profile to add missing IDs to
     */
    addMissingIdsToBonuses(pmcProfile: IPmcData): void;
    /**
     * 3.8.0 utilized the wrong ProductionTime for bitcoin, fix it if it's found
     */
    fixBitcoinProductionTime(pmcProfile: IPmcData): void;
    /**
     * At some point the property name was changed,migrate data across to new name
     * @param pmcProfile Profile to migrate improvements in
     */
    protected migrateImprovements(pmcProfile: IPmcData): void;
    /**
     * After removing mods that add quests, the quest panel will break without removing these
     * @param pmcProfile Profile to remove dead quests from
     */
    protected removeOrphanedQuests(pmcProfile: IPmcData): void;
    /**
     * If someone has run a mod from pre-3.8.0, it results in an invalid `nextResupply` value
     * Resolve this by setting the nextResupply to 0 if it's undefined
     */
    protected fixNullTraderNextResupply(pmcProfile: IPmcData): void;
}
