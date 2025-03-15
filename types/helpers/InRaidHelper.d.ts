import { QuestController } from "@spt/controllers/QuestController";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILostOnDeathConfig } from "@spt/models/spt/config/ILostOnDeathConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import { ProfileHelper } from "./ProfileHelper";
import { QuestHelper } from "./QuestHelper";
export declare class InRaidHelper {
    protected logger: ILogger;
    protected inventoryHelper: InventoryHelper;
    protected itemHelper: ItemHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected databaseService: DatabaseService;
    protected questController: QuestController;
    protected profileHelper: ProfileHelper;
    protected questHelper: QuestHelper;
    protected lostOnDeathConfig: ILostOnDeathConfig;
    protected inRaidConfig: IInRaidConfig;
    constructor(logger: ILogger, inventoryHelper: InventoryHelper, itemHelper: ItemHelper, configServer: ConfigServer, cloner: ICloner, databaseService: DatabaseService, questController: QuestController, profileHelper: ProfileHelper, questHelper: QuestHelper);
    /**
     * @deprecated
     * Reset the skill points earned in a raid to 0, ready for next raid
     * @param profile Profile to update
     */
    protected resetSkillPointsEarnedDuringRaid(profile: IPmcData): void;
    /**
     * Update a players inventory post-raid
     * Remove equipped items from pre-raid
     * Add new items found in raid to profile
     * Store insurance items in profile
     * @param sessionID Session id
     * @param serverProfile Profile to update
     * @param postRaidProfile Profile returned by client after a raid
     */
    setInventory(sessionID: string, serverProfile: IPmcData, postRaidProfile: IPmcData, isSurvived: boolean, isTransfer: boolean): void;
    /**
     * Remove FiR status from items
     * @param items Items to process
     */
    protected removeFiRStatusFromCertainItems(items: IItem[]): void;
    /**
     * Add items from one parameter into another
     * @param itemsToAdd Items we want to add
     * @param serverInventoryItems Location to add items to
     */
    protected addItemsToInventory(itemsToAdd: IItem[], serverInventoryItems: IItem[]): void;
    /**
     * Clear PMC inventory of all items except those that are exempt
     * Used post-raid to remove items after death
     * @param pmcData Player profile
     * @param sessionId Session id
     */
    deleteInventory(pmcData: IPmcData, sessionId: string): void;
    /**
     * Remove FiR status from designated container
     * @param sessionId Session id
     * @param pmcData Player profile
     * @param secureContainerSlotId Container slot id to find items for and remove FiR from
     */
    removeFiRStatusFromItemsInContainer(sessionId: string, pmcData: IPmcData, secureContainerSlotId: string): void;
    /**
     * Get an array of items from a profile that will be lost on death
     * @param pmcProfile Profile to get items from
     * @returns Array of items lost on death
     */
    protected getInventoryItemsLostOnDeath(pmcProfile: IPmcData): IItem[];
    /**
     * Does the provided items slotId mean its kept on the player after death
     * @pmcData Player profile
     * @itemToCheck Item to check should be kept
     * @returns true if item is kept after death
     */
    protected isItemKeptAfterDeath(pmcData: IPmcData, itemToCheck: IItem): boolean;
}
