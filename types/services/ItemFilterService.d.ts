import { IItemConfig } from "@spt-aki/models/spt/config/IItemConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
/** Centralise the handling of blacklisting items, uses blacklist found in config/item.json, stores items that should not be used by players / broken items */
export declare class ItemFilterService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected itemConfig: IItemConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Check if the provided template id is blacklisted in config/item.json
     * @param tpl template id
     * @returns true if blacklisted
     */
    isItemBlacklisted(tpl: string): boolean;
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
     * Return every template id blacklisted in config/item.json
     * @returns string array of blacklisted tempalte ids
     */
    getBlacklistedItems(): string[];
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
