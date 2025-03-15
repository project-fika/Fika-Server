import type { IQuestCondition } from "@spt/models/eft/common/tables/IQuest";
import type { IReward } from "@spt/models/eft/common/tables/IReward";
export interface IPrestige {
    elements: IPretigeElement[];
}
export interface IPretigeElement {
    id: string;
    conditions: IQuestCondition[];
    rewards: IReward[];
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
