import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { Mods } from "@spt-aki/models/eft/common/tables/IBotType";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { VFS } from "@spt-aki/utils/VFS";
/** Store a mapping between weapons, their slots and the items that fit those slots */
export declare class BotEquipmentModPoolService {
    protected logger: ILogger;
    protected vfs: VFS;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    protected weaponModPool: Mods;
    protected gearModPool: Mods;
    protected weaponPoolGenerated: boolean;
    protected armorPoolGenerated: boolean;
    constructor(logger: ILogger, vfs: VFS, itemHelper: ItemHelper, databaseServer: DatabaseServer, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Store dictionary of mods for each item passed in
     * @param items items to find related mods and store in modPool
     */
    protected generatePool(items: ITemplateItem[], poolType: string): void;
    /**
     * Empty the mod pool
     */
    resetPool(): void;
    /**
     * Get array of compatible mods for an items mod slot (generate pool if it doesnt exist already)
     * @param itemTpl item to look up
     * @param slotName slot to get compatible mods for
     * @returns tpls that fit the slot
     */
    getCompatibleModsForWeaponSlot(itemTpl: string, slotName: string): string[];
    /**
     * Get array of compatible mods for an items mod slot (generate pool if it doesnt exist already)
     * @param itemTpl item to look up
     * @param slotName slot to get compatible mods for
     * @returns tpls that fit the slot
     */
    getCompatibleModsFoGearSlot(itemTpl: string, slotName: string): string[];
    /**
     * Get mods for a piece of gear by its tpl
     * @param itemTpl items tpl to look up mods for
     * @returns Dictionary of mods (keys are mod slot names) with array of compatible mod tpls as value
     */
    getModsForGearSlot(itemTpl: string): Record<string, string[]>;
    /**
     * Get mods for a weapon by its tpl
     * @param itemTpl Weapons tpl to look up mods for
     * @returns Dictionary of mods (keys are mod slot names) with array of compatible mod tpls as value
     */
    getModsForWeaponSlot(itemTpl: string): Record<string, string[]>;
    /**
     * Create weapon mod pool and set generated flag to true
     */
    protected generateWeaponPool(): void;
    /**
     * Create gear mod pool and set generated flag to true
     */
    protected generateGearPool(): void;
}
