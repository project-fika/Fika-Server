/**
 * Dynamically generate the following two files:
 * - src/models/enums/ItemTpl.ts
 * - src/models/enums/Weapons.ts
 *
 * Based on data from the assets/database folders.
 *
 * Usage:
 * - Run this script using npm: `npm run gen:items`
 *
 * Notes:
 * - Ensure that all necessary Node.js modules are installed before running the script: `npm install`
 * - The following rules are used for determining item base names:
 * -- Certain items are manually overridden by itemOverrides.ts, when the names are not unique enough
 * -- Random containers, built in inserts and stashes utilize the item's _name property
 * -- Ammo, ammo boxes, and magazines utilize the item's English locale ShortName property
 * -- All other items utilize the item's English locale Name property
 * -- In the event the above rules fail, the fallback order is the Englick locale Name property, then the item's _name property
 * -- Trailing and leading whitespace is stripped, special characters are removed, and spaces are replaced with underscores
 * - Item caliber data is cleaned of the words "CALIBER", "PARA" and "NATO", as well as replacing "1143x23ACP" with "45ACP" for consistency
 * - Damaged ammo boxes are suffixed with "_DAMAGED"
 * - The parent item type prefix is grouped more than the base item list, see "getParentName" for the rules around this
 * - Finalized enum names are created as a combination of the parent name, prefix, item name, and suffix
 */
import { OnLoad } from "@spt/di/OnLoad";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocaleService } from "@spt/services/LocaleService";
export declare class ItemTplGenerator {
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected onLoadComponents: OnLoad[];
    private enumDir;
    private items;
    private itemOverrides;
    private collidedEnumKeys;
    constructor(databaseServer: DatabaseServer, localeService: LocaleService, logger: ILogger, itemHelper: ItemHelper, onLoadComponents: OnLoad[]);
    run(): Promise<void>;
    /**
     * Return an object containing all items in the game with a generated name
     * @returns An object containing a generated item name to item ID association
     */
    private generateItemsObject;
    /**
     *
     * @param orderedItemsObject The previously generated object of item name to item ID associations
     * @returns
     */
    private generateWeaponsObject;
    /**
     * Clear any non-alpha numeric characters, and fix multiple underscores
     * @param enumKey The enum key to sanitize
     * @returns The sanitized enum key
     */
    private sanitizeEnumKey;
    private getParentName;
    private isValidItem;
    /**
     * Generate a prefix for the passed in item
     * @param item The item to generate the prefix for
     * @returns The prefix of the given item
     */
    private getItemPrefix;
    private getItemSuffix;
    private getAmmoPrefix;
    private cleanCaliber;
    private getAmmoBoxPrefix;
    private getMagazinePrefix;
    /**
     * Return the name of the passed in item, formatted for use in an enum
     * @param item The item to generate the name for
     * @returns The name of the given item
     */
    private getItemName;
    private getItemNameSuffix;
    private logEnumValueChanges;
    private writeEnumsToFile;
}
