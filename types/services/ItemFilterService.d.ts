import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ICloner } from "@spt/utils/cloners/ICloner";
/** Centralise the handling of blacklisting items, uses blacklist found in config/item.json, stores items that should not be used by players / broken items */
export declare class ItemFilterService {
    protected logger: ILogger;
    protected cloner: ICloner;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected itemConfig: IItemConfig;
    protected itemBlacklistCache: Set<string>;
    protected lootableItemBlacklistCache: Set<string>;
    constructor(logger: ILogger, cloner: ICloner, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Check if the provided template id is blacklisted in config/item.json/blacklist
     * @param tpl template id
     * @returns true if blacklisted
     */
    isItemBlacklisted(tpl: string): boolean;
    /**
     * Check if the provided template id is blacklisted in config/item.json/lootableItemBlacklist
     * @param tpl template id
     * @returns true if blacklisted
     */
    isLootableItemBlacklisted(tpl: string): boolean;
    /**
     * Check if item is blacklisted from being a reward for player
     * @param tpl item tpl to check is on blacklist
     * @returns True when blacklisted
     */
    isItemRewardBlacklisted(tpl: string): boolean;
    /**
     * Get an array of items that should never be given as a reward to player
     * @returns string array of item tpls
     */
    getItemRewardBlacklist(): string[];
    /**
     * Get an array of item types that should never be given as a reward to player
     * @returns string array of item base ids
     */
    getItemRewardBaseTypeBlacklist(): string[];
    /**
     * Return every template id blacklisted in config/item.json
     * @returns string array of blacklisted tempalte ids
     */
    getBlacklistedItems(): string[];
    /**
     * Return every template id blacklisted in config/item.json/lootableItemBlacklist
     * @returns string array of blacklisted tempalte ids
     */
    getBlacklistedLootableItems(): string[];
    /**
     * Check if the provided template id is boss item in config/item.json
     * @param tpl template id
     * @returns true if boss item
     */
    isBossItem(tpl: string): boolean;
    /**
     * Return boss items in config/item.json
     * @returns string array of boss item tempalte ids
     */
    getBossItems(): string[];
}
