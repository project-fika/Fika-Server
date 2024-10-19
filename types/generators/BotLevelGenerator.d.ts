import { MinMax } from "@spt/models/common/MinMax";
import { IRandomisedBotLevelResult } from "@spt/models/eft/bot/IRandomisedBotLevelResult";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { MathUtil } from "@spt/utils/MathUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class BotLevelGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected mathUtil: MathUtil;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, mathUtil: MathUtil);
    /**
     * Return a randomised bot level and exp value
     * @param levelDetails Min and max of level for bot
     * @param botGenerationDetails Details to help generate a bot
     * @param bot Bot the level is being generated for
     * @returns IRandomisedBotLevelResult object
     */
    generateBotLevel(levelDetails: MinMax, botGenerationDetails: IBotGenerationDetails, bot: IBotBase): IRandomisedBotLevelResult;
    protected chooseBotLevel(min: number, max: number, shift: number, number: number): number;
    /**
     * Return the min and max bot level based on a relative delta from the PMC level
     * @param botGenerationDetails Details to help generate a bot
     * @param levelDetails
     * @param maxlevel Max level allowed
     * @returns A MinMax of the lowest and highest level to generate the bots
     */
    protected getRelativeBotLevelRange(botGenerationDetails: IBotGenerationDetails, levelDetails: MinMax, maxAvailableLevel: number): MinMax;
}
