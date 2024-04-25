import { MinMax } from "@spt-aki/models/common/MinMax";
import { Difficulty, IBotType } from "@spt-aki/models/eft/common/tables/IBotType";
import { EquipmentFilters, IBotConfig, RandomisationDetails } from "@spt-aki/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class BotHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, databaseServer: DatabaseServer, randomUtil: RandomUtil, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Get a template object for the specified botRole from bots.types db
     * @param role botRole to get template for
     * @returns IBotType object
     */
    getBotTemplate(role: string): IBotType;
    /**
     * Randomize the chance the PMC will attack their own side
     * Look up value in bot.json/chanceSameSideIsHostilePercent
     * @param difficultySettings pmc difficulty settings
     */
    randomizePmcHostility(difficultySettings: Difficulty): void;
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
    addBotToFriendlyList(difficultySettings: Difficulty, typeToAdd: string): void;
    /**
     * Add a bot to the ENEMY_BOT_TYPES array, do not add itself if its on the enemy list
     * @param difficultySettings bot settings to alter
     * @param typesToAdd bot type to add to enemy list
     */
    addBotToEnemyList(difficultySettings: Difficulty, typesToAdd: string[], typeBeingEdited: string): void;
    /**
     * Add a bot to the REVENGE_BOT_TYPES array
     * @param difficultySettings bot settings to alter
     * @param typesToAdd bot type to add to revenge list
     */
    addBotToRevengeList(difficultySettings: Difficulty, typesToAdd: string[]): void;
    /**
     * Choose if a bot should become a PMC by checking if bot type is allowed to become a Pmc in botConfig.convertFromChances and doing a random int check
     * @param botRole the bot role to check if should be a pmc
     * @returns true if should be a pmc
     */
    shouldBotBePmc(botRole: string): boolean;
    rollChanceToBePmc(role: string, botConvertMinMax: MinMax): boolean;
    botRoleIsPmc(botRole: string): boolean;
    /**
     * Get randomization settings for bot from config/bot.json
     * @param botLevel level of bot
     * @param botEquipConfig bot equipment json
     * @returns RandomisationDetails
     */
    getBotRandomizationDetails(botLevel: number, botEquipConfig: EquipmentFilters): RandomisationDetails;
    /**
     * Choose between sptBear and sptUsec at random based on the % defined in pmcConfig.isUsec
     * @returns pmc role
     */
    getRandomizedPmcRole(): string;
    /**
     * Get the corresponding side when sptBear or sptUsec is passed in
     * @param botRole role to get side for
     * @returns side (usec/bear)
     */
    getPmcSideByRole(botRole: string): string;
    /**
     * Get a randomized PMC side based on bot config value 'isUsec'
     * @returns pmc side as string
     */
    protected getRandomizedPmcSide(): string;
}
