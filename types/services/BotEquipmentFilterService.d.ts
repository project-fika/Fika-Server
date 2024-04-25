import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { EquipmentChances, Generation, GenerationData, IBotType, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotGenerationDetails } from "@spt-aki/models/spt/bots/BotGenerationDetails";
import { EquipmentFilterDetails, EquipmentFilters, IAdjustmentDetails, IBotConfig, WeightingAdjustmentDetails } from "@spt-aki/models/spt/config/IBotConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
export declare class BotEquipmentFilterService {
    protected logger: ILogger;
    protected botHelper: BotHelper;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    protected botEquipmentConfig: Record<string, EquipmentFilters>;
    constructor(logger: ILogger, botHelper: BotHelper, profileHelper: ProfileHelper, configServer: ConfigServer);
    /**
     * Filter a bots data to exclude equipment and cartridges defines in the botConfig
     * @param sessionId Players id
     * @param baseBotNode bots json data to filter
     * @param botLevel Level of the bot
     * @param botGenerationDetails details on how to generate a bot
     */
    filterBotEquipment(sessionId: string, baseBotNode: IBotType, botLevel: number, botGenerationDetails: BotGenerationDetails): void;
    /**
     * Iterate over the changes passed in and apply them to baseValues parameter
     * @param equipmentChanges Changes to apply
     * @param baseValues data to update
     */
    protected adjustChances(equipmentChanges: Record<string, number>, baseValues: EquipmentChances | ModsChances): void;
    /**
     * Iterate over the Generation changes and alter data in baseValues.Generation
     * @param generationChanges Changes to apply
     * @param baseBotGeneration dictionary to update
     */
    protected adjustGenerationChances(generationChanges: Record<string, GenerationData>, baseBotGeneration: Generation): void;
    /**
     * Get equipment settings for bot
     * @param botEquipmentRole equipment role to return
     * @returns EquipmentFilters object
     */
    getBotEquipmentSettings(botEquipmentRole: string): EquipmentFilters;
    /**
     * Get weapon sight whitelist for a specific bot type
     * @param botEquipmentRole equipment role of bot to look up
     * @returns Dictionary of weapon type and their whitelisted scope types
     */
    getBotWeaponSightWhitelist(botEquipmentRole: string): Record<string, string[]>;
    /**
     * Get an object that contains equipment and cartridge blacklists for a specified bot type
     * @param botRole Role of the bot we want the blacklist for
     * @param playerLevel Level of the player
     * @returns EquipmentBlacklistDetails object
     */
    getBotEquipmentBlacklist(botRole: string, playerLevel: number): EquipmentFilterDetails;
    /**
     * Get the whitelist for a specific bot type that's within the players level
     * @param botRole Bot type
     * @param playerLevel Players level
     * @returns EquipmentFilterDetails object
     */
    protected getBotEquipmentWhitelist(botRole: string, playerLevel: number): EquipmentFilterDetails;
    /**
     * Retrieve item weighting adjustments from bot.json config based on bot level
     * @param botRole Bot type to get adjustments for
     * @param botLevel Level of bot
     * @returns Weighting adjustments for bot items
     */
    protected getBotWeightingAdjustments(botRole: string, botLevel: number): WeightingAdjustmentDetails;
    /**
     * Retrieve item weighting adjustments from bot.json config based on player level
     * @param botRole Bot type to get adjustments for
     * @param playerlevel Level of bot
     * @returns Weighting adjustments for bot items
     */
    protected getBotWeightingAdjustmentsByPlayerLevel(botRole: string, playerlevel: number): WeightingAdjustmentDetails;
    /**
     * Filter bot equipment based on blacklist and whitelist from config/bot.json
     * Prioritizes whitelist first, if one is found blacklist is ignored
     * @param baseBotNode bot .json file to update
     * @param blacklist equipment blacklist
     * @returns Filtered bot file
     */
    protected filterEquipment(baseBotNode: IBotType, blacklist: EquipmentFilterDetails, whitelist: EquipmentFilterDetails): void;
    /**
     * Filter bot cartridges based on blacklist and whitelist from config/bot.json
     * Prioritizes whitelist first, if one is found blacklist is ignored
     * @param baseBotNode bot .json file to update
     * @param blacklist equipment on this list should be excluded from the bot
     * @param whitelist equipment on this list should be used exclusively
     * @returns Filtered bot file
     */
    protected filterCartridges(baseBotNode: IBotType, blacklist: EquipmentFilterDetails, whitelist: EquipmentFilterDetails): void;
    /**
     * Add/Edit weighting changes to bot items using values from config/bot.json/equipment
     * @param weightingAdjustments Weighting change to apply to bot
     * @param botItemPool Bot item dictionary to adjust
     */
    protected adjustWeighting(weightingAdjustments: IAdjustmentDetails, botItemPool: Record<string, any>, showEditWarnings?: boolean): void;
}
