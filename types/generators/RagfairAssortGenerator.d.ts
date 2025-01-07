import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { IPreset } from "@spt/models/eft/common/IGlobals";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
export declare class RagfairAssortGenerator {
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected databaseServer: DatabaseServer;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected generatedAssortItems: IItem[][];
    protected ragfairConfig: IRagfairConfig;
    protected ragfairItemInvalidBaseTypes: string[];
    constructor(hashUtil: HashUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, databaseServer: DatabaseServer, seasonalEventService: SeasonalEventService, configServer: ConfigServer);
    /**
     * Get an array of arrays that can be sold on the flea
     * Each sub array contains item + children (if any)
     * @returns array of arrays
     */
    getAssortItems(): IItem[][];
    /**
     * Check internal generatedAssortItems array has objects
     * @returns true if array has objects
     */
    protected assortsAreGenerated(): boolean;
    /**
     * Generate an array of arrays (item + children) the flea can sell
     * @returns array of arrays (item + children)
     */
    protected generateRagfairAssortItems(): IItem[][];
    /**
     * Get presets from globals to add to flea
     * ragfairConfig.dynamic.showDefaultPresetsOnly decides if its all presets or just defaults
     * @returns IPreset array
     */
    protected getPresetsToAdd(): IPreset[];
    /**
     * Create a base assort item and return it with populated values + 999999 stack count + unlimited count = true
     * @param tplId tplid to add to item
     * @param id id to add to item
     * @returns Hydrated Item object
     */
    protected createRagfairAssortRootItem(tplId: string, id?: string): IItem;
}
