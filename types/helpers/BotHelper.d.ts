import { MinMax } from "@spt/models/common/MinMax";
import { IBotType, IDifficultyCategories } from "@spt/models/eft/common/tables/IBotType";
import { EquipmentFilters, IBotConfig, IRandomisationDetails } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotHelper {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, randomUtil: RandomUtil, configServer: ConfigServer);
    /**
     * Get a template object for the specified botRole from bots.types db
     * @param role botRole to get template for
     * @returns IBotType object
     */
    getBotTemplate(role: string): IBotType;
    /**
     * Is the passed in bot role a PMC (usec/bear/pmc)
     * @param botRole bot role to check
     * @returns true if is pmc
     */
    isBotPmc(botRole: string): boolean;
    isBotBoss(botRole: string): boolean;
    isBotFollower(botRole: string): boolean;
    /**
     * Add a bot to the FRIENDLY_BOT_TYPES array
     * @param difficultySettings bot settings to alter
     * @param typeToAdd bot type to add to friendly list
     */
    addBotToFriendlyList(difficultySettings: IDifficultyCategories, typeToAdd: string): void;
    /**
     * Add a bot to the REVENGE_BOT_TYPES array
     * @param difficultySettings bot settings to alter
     * @param typesToAdd bot type to add to revenge list
     */
    addBotToRevengeList(difficultySettings: IDifficultyCategories, typesToAdd: string[]): void;
    rollChanceToBePmc(botConvertMinMax: MinMax): boolean;
    protected getPmcConversionValuesForLocation(location: string): Record<string, MinMax>;
    /**
     * is the provided role a PMC, case-agnostic
     * @param botRole Role to check
     * @returns True if role is PMC
     */
    botRoleIsPmc(botRole: string): boolean;
    /**
     * Get randomization settings for bot from config/bot.json
     * @param botLevel level of bot
     * @param botEquipConfig bot equipment json
     * @returns RandomisationDetails
     */
    getBotRandomizationDetails(botLevel: number, botEquipConfig: EquipmentFilters): IRandomisationDetails | undefined;
    /**
     * Choose between pmcBEAR and pmcUSEC at random based on the % defined in pmcConfig.isUsec
     * @returns pmc role
     */
    getRandomizedPmcRole(): string;
    /**
     * Get the corresponding side when pmcBEAR or pmcUSEC is passed in
     * @param botRole role to get side for
     * @returns side (usec/bear)
     */
    getPmcSideByRole(botRole: string): string;
    /**
     * Get a randomized PMC side based on bot config value 'isUsec'
     * @returns pmc side as string
     */
    protected getRandomizedPmcSide(): string;
    /**
     * Get a name from a PMC that fits the desired length
     * @param maxLength Max length of name, inclusive
     * @param side OPTIONAL - what side PMC to get name from (usec/bear)
     * @returns name of PMC
     */
    getPmcNicknameOfMaxLength(maxLength: number, side?: string): string;
}
