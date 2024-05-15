import { IEliminationConfig, IQuestConfig, IRepeatableQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ICloner } from "@spt-aki/utils/cloners/ICloner";
import { MathUtil } from "@spt-aki/utils/MathUtil";
import { ProbabilityObject, ProbabilityObjectArray } from "@spt-aki/utils/RandomUtil";
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
