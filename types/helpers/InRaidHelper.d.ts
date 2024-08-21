import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ILostOnDeathConfig } from "@spt/models/spt/config/ILostOnDeathConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class InRaidHelper {
    protected logger: ILogger;
    protected inventoryHelper: InventoryHelper;
    protected itemHelper: ItemHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected lostOnDeathConfig: ILostOnDeathConfig;
    constructor(logger: ILogger, inventoryHelper: InventoryHelper, itemHelper: ItemHelper, configServer: ConfigServer, cloner: ICloner);
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
    setInventory(sessionID: string, serverProfile: IPmcData, postRaidProfile: IPmcData): void;
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
    protected getInventoryItemsLostOnDeath(pmcProfile: IPmcData): Item[];
    /**
     * Does the provided items slotId mean its kept on the player after death
     * @pmcData Player profile
     * @itemToCheck Item to check should be kept
     * @returns true if item is kept after death
     */
    protected isItemKeptAfterDeath(pmcData: IPmcData, itemToCheck: Item): boolean;
}
