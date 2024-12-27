import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class ProbabilityHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    constructor(logger: ILogger, randomUtil: RandomUtil);
    /**
     * Chance to roll a number out of 100
     * @param chance Percentage chance roll should success
     * @param scale scale of chance to allow support of numbers > 1-100
     * @returns true if success
     */
    rollChance(chance: number, scale?: number): boolean;
}
