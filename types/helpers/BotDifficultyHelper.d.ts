import { BotHelper } from "@spt/helpers/BotHelper";
import { IDifficultyCategories } from "@spt/models/eft/common/tables/IBotType";
import { IBots } from "@spt/models/spt/bots/IBots";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
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
     * Get difficulty settings for desired bot type, if not found use assault bot types
     * @param type bot type to retrieve difficulty of
     * @param difficulty difficulty to get settings for (easy/normal etc)
     * @param botDb bots from database
     * @returns Difficulty object
     */
    getBotDifficultySettings(type: string, difficulty: string, botDb: IBots): IDifficultyCategories;
    /**
     * Get difficulty settings for a PMC
     * @param type "usec" / "bear"
     * @param difficulty what difficulty to retrieve
     * @returns Difficulty object
     */
    protected getDifficultySettings(type: string, difficulty: string): IDifficultyCategories;
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
