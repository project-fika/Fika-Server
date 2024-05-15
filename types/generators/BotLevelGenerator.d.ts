import { MinMax } from "@spt-aki/models/common/MinMax";
import { IRandomisedBotLevelResult } from "@spt-aki/models/eft/bot/IRandomisedBotLevelResult";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { BotGenerationDetails } from "@spt-aki/models/spt/bots/BotGenerationDetails";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class BotLevelGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseServer: DatabaseServer);
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
