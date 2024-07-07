import { IEliminationConfig, IQuestConfig, IRepeatableQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { MathUtil } from "@spt/utils/MathUtil";
import { ProbabilityObject, ProbabilityObjectArray } from "@spt/utils/RandomUtil";
export declare class RepeatableQuestHelper {
    protected mathUtil: MathUtil;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    constructor(mathUtil: MathUtil, configServer: ConfigServer, cloner: ICloner);
    /**
     * Get the relevant elimination config based on the current players PMC level
     * @param pmcLevel Level of PMC character
     * @param repeatableConfig Main repeatable config
     * @returns IEliminationConfig
     */
    getEliminationConfigByPmcLevel(pmcLevel: number, repeatableConfig: IRepeatableQuestConfig): IEliminationConfig;
    probabilityObjectArray<K, V>(configArrayInput: ProbabilityObject<K, V>[]): ProbabilityObjectArray<K, V>;
}
