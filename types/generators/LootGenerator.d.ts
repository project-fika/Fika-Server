import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IPreset } from "@spt-aki/models/eft/common/IGlobals";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ISealedAirdropContainerSettings, RewardDetails } from "@spt-aki/models/spt/config/IInventoryConfig";
import { LootItem } from "@spt-aki/models/spt/services/LootItem";
import { LootRequest } from "@spt-aki/models/spt/services/LootRequest";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { RagfairLinkedItemService } from "@spt-aki/services/RagfairLinkedItemService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
type ItemLimit = {
    current: number;
    max: number;
};
export declare class LootGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected jsonUtil: JsonUtil;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected localisationService: LocalisationService;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected itemFilterService: ItemFilterService;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseServer: DatabaseServer, randomUtil: RandomUtil, jsonUtil: JsonUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, weightedRandomHelper: WeightedRandomHelper, localisationService: LocalisationService, ragfairLinkedItemService: RagfairLinkedItemService, itemFilterService: ItemFilterService);
    /**
     * Generate a list of items based on configuration options parameter
     * @param options parameters to adjust how loot is generated
     * @returns An array of loot items
     */
    createRandomLoot(options: LootRequest): LootItem[];
    /**
     * Filter armor items by their main plates protection level
     * @param armor Armor preset
     * @param options Loot request options
     * @returns True item passes checks
     */
    protected armorIsDesiredProtectionLevel(armor: IPreset, options: LootRequest): boolean;
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
     * @param globalDefaultPresets presets to choose from
     * @param itemTypeCounts item limit counts
     * @param itemBlacklist items to skip
     * @param result array to add found preset to
     * @returns true if preset was valid and added to pool
     */
    protected findAndAddRandomPresetToLoot(globalDefaultPresets: IPreset[], itemTypeCounts: Record<string, {
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
