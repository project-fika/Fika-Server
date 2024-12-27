import type { IQuestCondition, IQuestReward } from "./IQuest";
export interface IPrestige {
    id: string;
    conditions: IQuestCondition[];
    rewards: IQuestReward[];
    transferConfigs: ITransferConfigs;
    image: string;
    bigImage: string;
}
export interface ITransferConfigs {
    stashConfig: IStashPrestigeConfig;
    skillConfig: IPrestigeSkillConfig;
    masteringConfig: IPrestigeMasteringConfig;
}
export interface IStashPrestigeConfig {
    xCellCount: number;
    yCellCount: number;
    filters: IStashPrestigeFilters;
}
export interface IStashPrestigeFilters {
    includedItems: string[];
    excludedItems: string[];
}
export interface IPrestigeSkillConfig {
    transferMultiplier: number;
}
export interface IPrestigeMasteringConfig {
    transferMultiplier: number;
}
