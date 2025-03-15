import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
export declare class BotModLimits {
    scope: ItemCount;
    scopeMax: number;
    scopeBaseTypes: string[];
    flashlightLaser: ItemCount;
    flashlightLaserMax: number;
    flashlgihtLaserBaseTypes: string[];
}
export declare class ItemCount {
    count: number;
}
export declare class BotWeaponModLimitService {
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected itemHelper: ItemHelper;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, configServer: ConfigServer, itemHelper: ItemHelper);
    /**
     * Initalise mod limits to be used when generating a weapon
     * @param botRole "assault", "bossTagilla" or "pmc"
     * @returns BotModLimits object
     */
    getWeaponModLimits(botRole: string): BotModLimits;
    /**
     * Check if weapon mod item is on limited list + has surpassed the limit set for it
     * Exception: Always allow ncstar backup mount
     * Exception: Always allow scopes with a scope for a parent
     * Exception: Always disallow mounts that hold only scopes once scope limit reached
     * Exception: Always disallow mounts that hold only flashlights once flashlight limit reached
     * @param botRole role the bot has e.g. assault
     * @param modTemplate mods template data
     * @param modLimits limits set for weapon being generated for this bot
     * @param modsParent The parent of the mod to be checked
     * @returns true if over item limit
     */
    weaponModHasReachedLimit(botRole: string, modTemplate: ITemplateItem, modLimits: BotModLimits, modsParent: ITemplateItem, weapon: IItem[]): boolean;
    /**
     * Check if the specific item type on the weapon has reached the set limit
     * @param modTpl log mod tpl if over type limit
     * @param currentCount current number of this item on gun
     * @param maxLimit mod limit allowed
     * @param botRole role of bot we're checking weapon of
     * @returns true if limit reached
     */
    protected weaponModLimitReached(modTpl: string, currentCount: {
        count: number;
    }, maxLimit: number, botRole: string): boolean;
}
