import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBotHideoutArea } from "@spt/models/eft/common/tables/IBotBase";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IStageRequirement } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutCircleOfCultistProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutCircleOfCultistProductionStartRequestData";
import { IHideoutProduction, IHideoutProductionData, IRequirement, IRequirementBase } from "@spt/models/eft/hideout/IHideoutProduction";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IDirectRewardSettings, IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
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
    protected databaseService: DatabaseService;
    protected itemFilterService: ItemFilterService;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected static circleOfCultistSlotId: string;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, cloner: ICloner, eventOutputHolder: EventOutputHolder, randomUtil: RandomUtil, hashUtil: HashUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, profileHelper: ProfileHelper, inventoryHelper: InventoryHelper, hideoutHelper: HideoutHelper, databaseService: DatabaseService, itemFilterService: ItemFilterService, seasonalEventService: SeasonalEventService, configServer: ConfigServer);
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
     * Register production inside player profile
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param recipeId Recipe id
     * @param sacrificedItems Items player sacrificed
     * @param rewardAmountRoubles Rouble amount to reward player in items with
     * @param directRewardSettings OPTIONAL: If craft is giving direct rewards
     */
    protected registerCircleOfCultistProduction(sessionId: string, pmcData: IPmcData, recipeId: string, sacrificedItems: IItem[], rewardAmountRoubles: number, directRewardSettings?: IDirectRewardSettings): void;
    /**
     * Get the circle craft time as seconds, value is based on reward item value
     * OR rewards are direct, then use custom craft time defined in oarameter object
     * @param rewardAmountRoubles Value of rewards in roubles
     * @param directRewardSettings OPTIONAL: If craft is giving direct rewards
     * @returns craft time seconds
     */
    protected getCircleCraftTimeSeconds(rewardAmountRoubles: number, directRewardSettings?: IDirectRewardSettings): number;
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
    protected getRewardsWithinBudget(rewardItemTplPool: string[], rewardBudget: number, cultistCircleStashId: string): IItem[][];
    /**
     * Give every item as a reward that's passed in
     * @param rewardTpls Item tpls to turn into reward items
     * @param cultistCircleStashId Id of stash item
     * @returns Array of item arrays
     */
    protected getExplicitRewards(explicitRewardSettings: IDirectRewardSettings, cultistCircleStashId: string): IItem[][];
    /**
     * Explicit rewards have thier own stack sizes as they dont use a reward rouble pool
     * @param rewardTpl Item being rewarded to get stack size of
     * @returns stack size of item
     */
    protected getExplicitRewardBaseTypeStackSize(rewardTpl: string): number;
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
     * @returns Array of tpls
     */
    protected getCultistCircleRewardPool(sessionId: string, pmcData: IPmcData): string[];
    /**
     * Get all active hideout areas
     * @param areas Hideout areas to iterate over
     * @returns Active area array
     */
    protected getPlayerAccessibleHideoutAreas(areas: IBotHideoutArea[]): IBotHideoutArea[];
    /**
     * Get all recipes the player has access to, includes base + unlocked recipes
     * @param unlockedRecipes Recipes player has flagged as unlocked
     * @param allRecipes All recipes
     * @returns Array of recipes
     */
    protected getPlayerAccessibleRecipes(unlockedRecipes: string[], allRecipes: IHideoutProductionData): IHideoutProduction[];
    /**
     * Iterate over passed in hideout requirements and return the Item
     * @param requirements Requirements to iterate over
     * @returns Array of item requirements
     */
    protected getItemRequirements(requirements: IRequirementBase[]): (IStageRequirement | IRequirement)[];
}
