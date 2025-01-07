import { IMods, IModsChances } from "@spt/models/eft/common/tables/IBotType";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { BotModLimits } from "@spt/services/BotWeaponModLimitService";
export interface IGenerateWeaponRequest {
    /** Weapon to add mods to / result that is returned */
    weapon: IItem[];
    /** Pool of compatible mods to attach to weapon */
    modPool: IMods;
    /** ParentId of weapon */
    weaponId: string;
    /** Weapon which mods will be generated on */
    parentTemplate: ITemplateItem;
    /** Chance values mod will be added */
    modSpawnChances: IModsChances;
    /** Ammo tpl to use when generating magazines/cartridges */
    ammoTpl: string;
    /** Bot-specific properties */
    botData: IBotData;
    /** limits placed on certain mod types per gun */
    modLimits: BotModLimits;
    /** Info related to the weapon being generated */
    weaponStats: IWeaponStats;
    /** Array of item tpls the weapon does not support */
    conflictingItemTpls: Set<string>;
}
export interface IBotData {
    /** Role of bot weapon is generated for */
    role: string;
    /** Level of the bot weapon is being generated for */
    level: number;
    /** role of bot when accessing bot.json equipment config settings */
    equipmentRole: string;
}
export interface IWeaponStats {
    hasOptic?: boolean;
    hasFrontIronSight?: boolean;
    hasRearIronSight?: boolean;
}
