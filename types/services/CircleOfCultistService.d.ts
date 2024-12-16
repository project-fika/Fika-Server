import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBotHideoutArea } from "@spt/models/eft/common/tables/IBotBase";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IStageRequirement } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutCircleOfCultistProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutCircleOfCultistProductionStartRequestData";
import { IRequirement, IRequirementBase } from "@spt/models/eft/hideout/IHideoutProduction";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ICraftTimeThreshhold, ICultistCircleSettings, IDirectRewardSettings, IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { ICircleCraftDetails } from "@spt/models/spt/hideout/ICircleCraftDetails";
import { IHideout } from "@spt/models/spt/hideout/IHideout";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class CircleOfCultistService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected cloner: ICloner;
    protected eventOutputHolder: EventOutputHolder;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected profileHelper: ProfileHelper;
    protected inventoryHelper: InventoryHelper;
    protected hideoutHelper: HideoutHelper;
    protected questHelper: QuestHelper;
    protected databaseService: DatabaseService;
    protected itemFilterService: ItemFilterService;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected static circleOfCultistSlotId: string;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, cloner: ICloner, eventOutputHolder: EventOutputHolder, randomUtil: RandomUtil, hashUtil: HashUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, profileHelper: ProfileHelper, inventoryHelper: InventoryHelper, hideoutHelper: HideoutHelper, questHelper: QuestHelper, databaseService: DatabaseService, itemFilterService: ItemFilterService, seasonalEventService: SeasonalEventService, configServer: ConfigServer);
    /**
     * Start a sacrifice event
     * Generate rewards
     * Delete sacrificed items
     * @param sessionId Session id
     * @param pmcData Player profile doing sacrifice
     * @param request Client request
     * @returns IItemEventRouterResponse
     */
    startSacrifice(sessionId: string, pmcData: IPmcData, request: IHideoutCircleOfCultistProductionStartRequestData): IItemEventRouterResponse;
    /**
     * Attempt to add all rewards to cultist circle, if they dont fit remove one and try again until they fit
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param rewards Rewards to send to player
     * @param containerGrid Cultist grid to add rewards to
     * @param cultistCircleStashId Stash id
     * @param output Client output
     */
    protected addRewardsToCircleContainer(sessionId: string, pmcData: IPmcData, rewards: IItem[][], containerGrid: number[][], cultistCircleStashId: string, output: IItemEventRouterResponse): void;
    /**
     * Create a map of the possible direct rewards, keyed by the items needed to be sacrificed
     * @param directRewards Direct rewards array from hideout config
     * @returns Map
     */
    protected generateSacrificedItemsCache(directRewards: IDirectRewardSettings[]): Map<string, IDirectRewardSettings>;
    /**
     * Get the reward amount multiple value based on players hideout management skill + configs rewardPriceMultiplerMinMax values
     * @param pmcData Player profile
     * @param cultistCircleSettings Circle config settings
     * @returns Reward Amount Multipler
     */
    protected getRewardAmountMultipler(pmcData: IPmcData, cultistCircleSettings: ICultistCircleSettings): number;
    /**
     * Register production inside player profile
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param recipeId Recipe id
     * @param sacrificedItems Items player sacrificed
     * @param craftingTime How long the ritual should take
     */
    protected registerCircleOfCultistProduction(sessionId: string, pmcData: IPmcData, recipeId: string, sacrificedItems: IItem[], craftingTime: number): void;
    /**
     * Get the circle craft time as seconds, value is based on reward item value
     * And get the bonus status to determine what tier of reward is given
     * @param rewardAmountRoubles Value of rewards in roubles
     * @param circleConfig Circle config values
     * @param directRewardSettings OPTIONAL - Values related to direct reward being given
     * @returns craft time + type of reward + reward details
     */
    protected getCircleCraftingInfo(rewardAmountRoubles: number, circleConfig: ICultistCircleSettings, directRewardSettings?: IDirectRewardSettings): ICircleCraftDetails;
    protected getMatchingThreshold(thresholds: ICraftTimeThreshhold[], rewardAmountRoubles: number): ICraftTimeThreshhold;
    /**
     * Get the items player sacrificed in circle
     * @param pmcData Player profile
     * @returns Array of its from player inventory
     */
    protected getSacrificedItems(pmcData: IPmcData): IItem[];
    /**
     * Given a pool of items + rouble budget, pick items until the budget is reached
     * @param rewardItemTplPool Items that can be picekd
     * @param rewardBudget Rouble budget to reach
     * @param cultistCircleStashId Id of stash item
     * @returns Array of item arrays
     */
    protected getRewardsWithinBudget(rewardItemTplPool: string[], rewardBudget: number, cultistCircleStashId: string, circleConfig: ICultistCircleSettings): IItem[][];
    /**
     * Get direct rewards
     * @param sessionId sessionId
     * @param directReward Items sacrificed
     * @param cultistCircleStashId Id of stash item
     * @returns The reward object
     */
    protected getDirectRewards(sessionId: string, directReward: IDirectRewardSettings, cultistCircleStashId: string): IItem[][];
    /**
     * Check for direct rewards from what player sacrificed
     * @param sessionId sessionId
     * @param sacrificedItems Items sacrificed
     * @returns Direct reward items to send to player
     */
    protected checkForDirectReward(sessionId: string, sacrificedItems: IItem[], directRewardsCache: Map<string, IDirectRewardSettings>): IDirectRewardSettings;
    /**
     * Create an md5 key of the sacrificed + reward items
     * @param directReward Direct reward to create key for
     * @returns Key
     */
    protected getDirectRewardHashKey(directReward: IDirectRewardSettings): string;
    /**
     * Explicit rewards have thier own stack sizes as they dont use a reward rouble pool
     * @param rewardTpl Item being rewarded to get stack size of
     * @returns stack size of item
     */
    protected getDirectRewardBaseTypeStackSize(rewardTpl: string): number;
    /**
     * Add a record to the players profile to signal they have accepted a non-repeatable direct reward
     * @param sessionId Session id
     * @param directReward Reward sent to player
     */
    protected flagDirectRewardAsAcceptedInProfile(sessionId: string, directReward: IDirectRewardSettings): void;
    /**
     * Get the size of a reward items stack
     * 1 for everything except ammo, ammo can be between min stack and max stack
     * @param itemTpl Item chosen
     * @param rewardPoolRemaining Rouble amount of pool remaining to fill
     * @returns Size of stack
     */
    protected getRewardStackSize(itemTpl: string, rewardPoolRemaining: number): number;
    /**
     * Get a pool of tpl IDs of items the player needs to complete hideout crafts/upgrade areas
     * @param sessionId Session id
     * @param pmcData Profile of player who will be getting the rewards
     * @param rewardType Do we return bonus items (hideout/task items)
     * @param cultistCircleConfig Circle config
     * @returns Array of tpls
     */
    protected getCultistCircleRewardPool(sessionId: string, pmcData: IPmcData, craftingInfo: ICircleCraftDetails, cultistCircleConfig: ICultistCircleSettings): string[];
    /**
     * Check players profile for quests with hand-in requirements and add those required items to the pool
     * @param pmcData Player profile
     * @param itemRewardBlacklist Items not to add to pool
     * @param rewardPool Pool to add items to
     */
    protected addTaskItemRequirementsToRewardPool(pmcData: IPmcData, itemRewardBlacklist: Set<string>, rewardPool: Set<string>): void;
    /**
     * Adds items the player needs to complete hideout crafts/upgrades to the reward pool
     * @param hideoutDbData Hideout area data
     * @param pmcData Player profile
     * @param itemRewardBlacklist Items not to add to pool
     * @param rewardPool Pool to add items to
     */
    protected addHideoutUpgradeRequirementsToRewardPool(hideoutDbData: IHideout, pmcData: IPmcData, itemRewardBlacklist: Set<string>, rewardPool: Set<string>): void;
    /**
     * Get all active hideout areas
     * @param areas Hideout areas to iterate over
     * @returns Active area array
     */
    protected getPlayerAccessibleHideoutAreas(areas: IBotHideoutArea[]): IBotHideoutArea[];
    /**
     * Get array of random reward items
     * @param rewardPool Reward pool to add to
     * @param itemRewardBlacklist Item tpls to ignore
     * @param itemsShouldBeHighValue Should these items meet the valuable threshold
     * @returns Set of item tpls
     */
    protected generateRandomisedItemsAndAddToRewardPool(rewardPool: Set<string>, itemRewardBlacklist: Set<string>, itemsShouldBeHighValue: boolean): Set<string>;
    /**
     * Iterate over passed in hideout requirements and return the Item
     * @param requirements Requirements to iterate over
     * @returns Array of item requirements
     */
    protected getItemRequirements(requirements: IRequirementBase[]): (IStageRequirement | IRequirement)[];
}
