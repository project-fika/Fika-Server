import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class FenceBaseAssortGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected itemFilterService: ItemFilterService;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemHelper: ItemHelper, presetHelper: PresetHelper, itemFilterService: ItemFilterService, seasonalEventService: SeasonalEventService, configServer: ConfigServer);
    /**
     * Create base fence assorts dynamically and store in memory
     */
    generateFenceBaseAssorts(): void;
    protected getItemPrice(itemTpl: string, items: Item[]): number;
    protected getAmmoBoxPrice(items: Item[]): number;
    /**
     * Add soft inserts + armor plates to an armor
     * @param armor Armor item array to add mods into
     * @param itemDbDetails Armor items db template
     */
    protected addChildrenToArmorModSlots(armor: Item[], itemDbDetails: ITemplateItem): void;
    /**
     * Check if item is valid for being added to fence assorts
     * @param item Item to check
     * @returns true if valid fence item
     */
    protected isValidFenceItem(item: ITemplateItem): boolean;
}
