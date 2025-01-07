import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
export declare class FenceBaseAssortGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseService: DatabaseService;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected itemFilterService: ItemFilterService;
    protected seasonalEventService: SeasonalEventService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected fenceService: FenceService;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseService: DatabaseService, handbookHelper: HandbookHelper, itemHelper: ItemHelper, presetHelper: PresetHelper, itemFilterService: ItemFilterService, seasonalEventService: SeasonalEventService, localisationService: LocalisationService, configServer: ConfigServer, fenceService: FenceService);
    /**
     * Create base fence assorts dynamically and store in memory
     */
    generateFenceBaseAssorts(): void;
    /**
     * Check ammo in boxes + loose ammos has a penetration value above the configured value in trader.json / ammoMaxPenLimit
     * @param rootItemDb Ammo box or ammo item from items.db
     * @returns True if penetration value is above limit set in config
     */
    protected isAmmoAbovePenetrationLimit(rootItemDb: ITemplateItem): boolean;
    /**
     * Get the penetration power value of an ammo, works with ammo boxes and raw ammos
     * @param rootItemDb Ammo box or ammo item from items.db
     * @returns Penetration power of passed in item, undefined if it doesnt have a power
     */
    protected getAmmoPenetrationPower(rootItemDb: ITemplateItem): number | undefined;
    /**
     * Add soft inserts + armor plates to an armor
     * @param armor Armor item array to add mods into
     * @param itemDbDetails Armor items db template
     */
    protected addChildrenToArmorModSlots(armor: IItem[], itemDbDetails: ITemplateItem): void;
    /**
     * Check if item is valid for being added to fence assorts
     * @param item Item to check
     * @returns true if valid fence item
     */
    protected isValidFenceItem(item: ITemplateItem): boolean;
}
