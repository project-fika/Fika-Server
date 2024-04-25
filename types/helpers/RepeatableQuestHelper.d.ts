import { IEliminationConfig, IQuestConfig, IRepeatableQuestConfig } from "@spt-aki/models/spt/config/IQuestConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { MathUtil } from "@spt-aki/utils/MathUtil";
import { ProbabilityObject, ProbabilityObjectArray } from "@spt-aki/utils/RandomUtil";
export declare class RepeatableQuestHelper {
    protected mathUtil: MathUtil;
    protected jsonUtil: JsonUtil;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(mathUtil: MathUtil, jsonUtil: JsonUtil, configServer: ConfigServer);
    /**
     * Get the relevant elimination config based on the current players PMC level
     * @param pmcLevel Level of PMC character
     * @param repeatableConfig Main repeatable config
     * @returns IEliminationConfig
     */
    getEliminationConfigByPmcLevel(pmcLevel: number, repeatableConfig: IRepeatableQuestConfig): IEliminationConfig;
    probabilityObjectArray<K, V>(configArrayInput: ProbabilityObject<K, V>[]): ProbabilityObjectArray<K, V>;
}
