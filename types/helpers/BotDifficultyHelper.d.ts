import { BotHelper } from "@spt/helpers/BotHelper";
import { Difficulty } from "@spt/models/eft/common/tables/IBotType";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotDifficultyHelper {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected randomUtil: RandomUtil;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, randomUtil: RandomUtil, localisationService: LocalisationService, botHelper: BotHelper, configServer: ConfigServer, cloner: ICloner);
    /**
     * Get a difficulty object modified to handle fighting other PMCs
     * @param pmcType 'bear or 'usec'
     * @param difficulty easy / normal / hard / impossible
     * @param usecType pmcUSEC
     * @param bearType pmcBEAR
     * @returns Difficulty object
     */
    getPmcDifficultySettings(pmcType: "bear" | "usec", difficulty: string, usecType: string, bearType: string): Difficulty;
    /**
     * Add bot types to ENEMY_BOT_TYPES array
     * @param difficultySettings Bot settings to alter
     * @param typesToAdd Bot types to add to enemy list
     * @param typeBeingEdited Bot type to ignore and not add to enemy list
     */
    protected addBotToEnemyList(difficultySettings: Difficulty, typesToAdd: string[], typeBeingEdited?: string): void;
    /**
     * Configure difficulty settings to be hostile to USEC and BEAR
     * Look up value in bot.json/chanceSameSideIsHostilePercent
     * @param difficultySettings pmc difficulty settings
     */
    protected setDifficultyToHostileToBearAndUsec(difficultySettings: Difficulty): void;
    /**
     * Get difficulty settings for desired bot type, if not found use assault bot types
     * @param type bot type to retrieve difficulty of
     * @param difficulty difficulty to get settings for (easy/normal etc)
     * @returns Difficulty object
     */
    getBotDifficultySettings(type: string, difficulty: string): Difficulty;
    /**
     * Get difficulty settings for a PMC
     * @param type "usec" / "bear"
     * @param difficulty what difficulty to retrieve
     * @returns Difficulty object
     */
    protected getDifficultySettings(type: string, difficulty: string): Difficulty;
    /**
     * Translate chosen value from pre-raid difficulty dropdown into bot difficulty value
     * @param dropDownDifficulty Dropdown difficulty value to convert
     * @returns bot difficulty
     */
    convertBotDifficultyDropdownToBotDifficulty(dropDownDifficulty: string): string;
    /**
     * Choose a random difficulty from - easy/normal/hard/impossible
     * @returns random difficulty
     */
    chooseRandomDifficulty(): string;
}
