import { MinMax } from "@spt/models/common/MinMax";
import { IRandomisedBotLevelResult } from "@spt/models/eft/bot/IRandomisedBotLevelResult";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { BotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotLevelGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService);
    /**
     * Return a randomised bot level and exp value
     * @param levelDetails Min and max of level for bot
     * @param botGenerationDetails Details to help generate a bot
     * @param bot Bot the level is being generated for
     * @returns IRandomisedBotLevelResult object
     */
    generateBotLevel(levelDetails: MinMax, botGenerationDetails: BotGenerationDetails, bot: IBotBase): IRandomisedBotLevelResult;
    /**
     * Get the highest level a bot can be relative to the players level, but no further than the max size from globals.exp_table
     * @param botGenerationDetails Details to help generate a bot
     * @param levelDetails
     * @param maxLevel Max possible level
     * @returns Highest level possible for bot
     */
    protected getHighestRelativeBotLevel(botGenerationDetails: BotGenerationDetails, levelDetails: MinMax, maxLevel: number): number;
    /**
     * Get the lowest level a bot can be relative to the players level, but no lower than 1
     * @param botGenerationDetails Details to help generate a bot
     * @param levelDetails
     * @param maxlevel Max level allowed
     * @returns Lowest level possible for bot
     */
    protected getLowestRelativeBotLevel(botGenerationDetails: BotGenerationDetails, levelDetails: MinMax, maxlevel: number): number;
}
