import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { Difficulty } from "@spt-aki/models/eft/common/tables/IBotType";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class BotDifficultyHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected configServer: ConfigServer;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, databaseServer: DatabaseServer, randomUtil: RandomUtil, localisationService: LocalisationService, botHelper: BotHelper, configServer: ConfigServer);
    getPmcDifficultySettings(pmcType: "bear" | "usec", difficulty: string, usecType: string, bearType: string): Difficulty;
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
