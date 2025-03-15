import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuestRewards } from "@spt/models/eft/common/tables/IQuest";
import { IReward } from "@spt/models/eft/common/tables/IReward";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IBaseQuestConfig, IQuestConfig, IRepeatableQuestConfig, IRewardScaling } from "@spt/models/spt/config/IQuestConfig";
import { IQuestRewardValues } from "@spt/models/spt/repeatable/IQuestRewardValues";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { MathUtil } from "@spt/utils/MathUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RepeatableQuestRewardGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected mathUtil: MathUtil;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected handbookHelper: HandbookHelper;
    protected localisationService: LocalisationService;
    protected itemFilterService: ItemFilterService;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, hashUtil: HashUtil, mathUtil: MathUtil, databaseService: DatabaseService, itemHelper: ItemHelper, presetHelper: PresetHelper, handbookHelper: HandbookHelper, localisationService: LocalisationService, itemFilterService: ItemFilterService, seasonalEventService: SeasonalEventService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Generate the reward for a mission. A reward can consist of:
     * - Experience
     * - Money
     * - GP coins
     * - Weapon preset
     * - Items
     * - Trader Reputation
     * - Skill level experience
     *
     * The reward is dependent on the player level as given by the wiki. The exact mapping of pmcLevel to
     * experience / money / items / trader reputation can be defined in QuestConfig.js
     *
     * There's also a random variation of the reward the spread of which can be also defined in the config
     *
     * Additionally, a scaling factor w.r.t. quest difficulty going from 0.2...1 can be used
     * @param pmcLevel Level of player reward is being generated for
     * @param difficulty Reward scaling factor from 0.2 to 1
     * @param traderId Trader reward will be given by
     * @param repeatableConfig Config for quest type (daily, weekly)
     * @param questConfig
     * @param rewardTplBlacklist OPTIONAL: list of tpls to NOT use when picking a reward
     * @returns IQuestRewards
     */
    generateReward(pmcLevel: number, difficulty: number, traderId: string, repeatableConfig: IRepeatableQuestConfig, questConfig: IBaseQuestConfig, rewardTplBlacklist?: string[]): IQuestRewards;
    protected getQuestRewardValues(rewardScaling: IRewardScaling, difficulty: number, pmcLevel: number): IQuestRewardValues;
    /**
     * Get an array of items + stack size to give to player as reward that fit inside of a rouble budget
     * @param itemPool All possible items to choose rewards from
     * @param maxItemCount Total number of items to reward
     * @param itemRewardBudget Rouble buget all item rewards must fit in
     * @param repeatableConfig config for quest type
     * @returns Items and stack size
     */
    protected getRewardableItemsFromPoolWithinBudget(itemPool: ITemplateItem[], maxItemCount: number, itemRewardBudget: number, repeatableConfig: IRepeatableQuestConfig): {
        item: ITemplateItem;
        stackSize: number;
    }[];
    /**
     * Choose a random Weapon preset that fits inside of a rouble amount limit
     * @param roublesBudget
     * @param rewardIndex
     * @returns IReward
     */
    protected getRandomWeaponPresetWithinBudget(roublesBudget: number, rewardIndex: number): {
        weapon: IReward;
        price: number;
    } | undefined;
    /**
     * @param rewardItems List of reward items to filter
     * @param roublesBudget The budget remaining for rewards
     * @param minPrice The minimum priced item to include
     * @returns True if any items remain in `rewardItems`, false otherwise
     */
    protected filterRewardPoolWithinBudget(rewardItems: ITemplateItem[], roublesBudget: number, minPrice: number): ITemplateItem[];
    /**
     * Get a randomised number a reward items stack size should be based on its handbook price
     * @param item Reward item to get stack size for
     * @returns matching stack size for the passed in items price
     */
    protected getRandomisedRewardItemStackSizeByPrice(item: ITemplateItem): number;
    /**
     * Should reward item have stack size increased (25% chance)
     * @param item Item to increase reward stack size of
     * @param maxRoublePriceToStack Maximum rouble price an item can be to still be chosen for stacking
     * @param randomChanceToPass Additional randomised chance of passing
     * @returns True if items stack size can be increased
     */
    protected canIncreaseRewardItemStackSize(item: ITemplateItem, maxRoublePriceToStack: number, randomChanceToPass?: number): boolean;
    /**
     * Get a count of cartridges that fits the rouble budget amount provided
     * e.g. how many M80s for 50,000 roubles
     * @param itemSelected Cartridge
     * @param roublesBudget Rouble budget
     * @param rewardNumItems
     * @returns Count that fits budget (min 1)
     */
    protected calculateAmmoStackSizeThatFitsBudget(itemSelected: ITemplateItem, roublesBudget: number, rewardNumItems: number): number;
    /**
     * Select a number of items that have a colelctive value of the passed in parameter
     * @param repeatableConfig Config
     * @param roublesBudget Total value of items to return
     * @param traderId Id of the trader who will give player reward
     * @returns Array of reward items that fit budget
     */
    protected chooseRewardItemsWithinBudget(repeatableConfig: IRepeatableQuestConfig, roublesBudget: number, traderId: string): ITemplateItem[];
    /**
     * Helper to create a reward item structured as required by the client
     *
     * @param   {string}    tpl             ItemId of the rewarded item
     * @param   {integer}   count           Amount of items to give
     * @param   {integer}   index           All rewards will be appended to a list, for unknown reasons the client wants the index
     * @param preset Optional array of preset items
     * @returns {object}                    Object of "Reward"-item-type
     */
    protected generateItemReward(tpl: string, count: number, index: number, foundInRaid?: boolean): IReward;
    /**
     * Helper to create a reward item structured as required by the client
     *
     * @param   {string}    tpl             ItemId of the rewarded item
     * @param   {integer}   count           Amount of items to give
     * @param   {integer}   index           All rewards will be appended to a list, for unknown reasons the client wants the index
     * @param preset Optional array of preset items
     * @returns {object}                    Object of "Reward"-item-type
     */
    protected generatePresetReward(tpl: string, count: number, index: number, preset?: IItem[], foundInRaid?: boolean): IReward;
    /**
     * Picks rewardable items from items.json
     * This means they must:
     * - Fit into the inventory
     * - Shouldn't be keys
     * - Have a price greater than 0
     * @param repeatableQuestConfig Config file
     * @param traderId Id of trader who will give reward to player
     * @returns List of rewardable items [[_tpl, itemTemplate],...]
     */
    getRewardableItems(repeatableQuestConfig: IRepeatableQuestConfig, traderId: string): [string, ITemplateItem][];
    /**
     * Checks if an id is a valid item. Valid meaning that it's an item that may be a reward
     * or content of bot loot. Items that are tested as valid may be in a player backpack or stash.
     * @param {string} tpl template id of item to check
     * @returns True if item is valid reward
     */
    protected isValidRewardItem(tpl: string, repeatableQuestConfig: IRepeatableQuestConfig, itemBaseWhitelist: string[]): boolean;
    protected getMoneyReward(traderId: string, rewardRoubles: number, rewardIndex: number): IReward;
}
