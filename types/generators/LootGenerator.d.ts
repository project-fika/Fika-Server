import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IPreset } from "@spt/models/eft/common/IGlobals";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ISealedAirdropContainerSettings, RewardDetails } from "@spt/models/spt/config/IInventoryConfig";
import { LootItem } from "@spt/models/spt/services/LootItem";
import { LootRequest } from "@spt/models/spt/services/LootRequest";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RagfairLinkedItemService } from "@spt/services/RagfairLinkedItemService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
type ItemLimit = {
    current: number;
    max: number;
};
export declare class LootGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseService: DatabaseService;
    protected randomUtil: RandomUtil;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected localisationService: LocalisationService;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected itemFilterService: ItemFilterService;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseService: DatabaseService, randomUtil: RandomUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, weightedRandomHelper: WeightedRandomHelper, localisationService: LocalisationService, ragfairLinkedItemService: RagfairLinkedItemService, itemFilterService: ItemFilterService);
    /**
     * Generate a list of items based on configuration options parameter
     * @param options parameters to adjust how loot is generated
     * @returns An array of loot items
     */
    createRandomLoot(options: LootRequest): LootItem[];
    /**
     * Filter armor items by their front plates protection level - top if its a helmet
     * @param armor Armor preset to check
     * @param options Loot request options - armor level etc
     * @returns True if item has desired armor level
     */
    protected isArmorOfDesiredProtectionLevel(armor: IPreset, options: LootRequest): boolean;
    /**
     * Construct item limit record to hold max and current item count for each item type
     * @param limits limits as defined in config
     * @returns record, key: item tplId, value: current/max item count allowed
     */
    protected initItemLimitCounter(limits: Record<string, number>): Record<string, ItemLimit>;
    /**
     * Find a random item in items.json and add to result array
     * @param items items to choose from
     * @param itemTypeCounts item limit counts
     * @param options item filters
     * @param result array to add found item to
     * @returns true if item was valid and added to pool
     */
    protected findAndAddRandomItemToLoot(items: [string, ITemplateItem][], itemTypeCounts: Record<string, {
        current: number;
        max: number;
    }>, options: LootRequest, result: LootItem[]): boolean;
    /**
     * Get a randomised stack count for an item between its StackMinRandom and StackMaxSize values
     * @param item item to get stack count of
     * @param options loot options
     * @returns stack count
     */
    protected getRandomisedStackCount(item: ITemplateItem, options: LootRequest): number;
    /**
     * Find a random item in items.json and add to result array
     * @param presetPool Presets to choose from
     * @param itemTypeCounts Item limit counts
     * @param itemBlacklist Items to skip
     * @param result Array to add chosen preset to
     * @returns true if preset was valid and added to pool
     */
    protected findAndAddRandomPresetToLoot(presetPool: IPreset[], itemTypeCounts: Record<string, {
        current: number;
        max: number;
    }>, itemBlacklist: string[], result: LootItem[]): boolean;
    /**
     * Sealed weapon containers have a weapon + associated mods inside them + assortment of other things (food/meds)
     * @param containerSettings sealed weapon container settings
     * @returns Array of item with children arrays
     */
    getSealedWeaponCaseLoot(containerSettings: ISealedAirdropContainerSettings): Item[][];
    /**
     * Get non-weapon mod rewards for a sealed container
     * @param containerSettings Sealed weapon container settings
     * @param weaponDetailsDb Details for the weapon to reward player
     * @returns Array of item with children arrays
     */
    protected getSealedContainerNonWeaponModRewards(containerSettings: ISealedAirdropContainerSettings, weaponDetailsDb: ITemplateItem): Item[][];
    /**
     * Iterate over the container weaponModRewardLimits settings and create an array of weapon mods to reward player
     * @param containerSettings Sealed weapon container settings
     * @param linkedItemsToWeapon All items that can be attached/inserted into weapon
     * @param chosenWeaponPreset The weapon preset given to player as reward
     * @returns Array of item with children arrays
     */
    protected getSealedContainerWeaponModRewards(containerSettings: ISealedAirdropContainerSettings, linkedItemsToWeapon: ITemplateItem[], chosenWeaponPreset: IPreset): Item[][];
    /**
     * Handle event-related loot containers - currently just the halloween jack-o-lanterns that give food rewards
     * @param rewardContainerDetails
     * @returns Array of item with children arrays
     */
    getRandomLootContainerLoot(rewardContainerDetails: RewardDetails): Item[][];
}
export {};
