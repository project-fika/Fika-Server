import { IQuest, IQuestConditionTypes, IQuestRewards } from "./IQuest";
export interface IRepeatableQuest extends IQuest {
    changeCost: IChangeCost[];
    changeStandingCost: number;
    sptRepatableGroupName: string;
}
export interface IRepeatableQuestDatabase {
    templates: IRepeatableTemplates;
    rewards: IRewardOptions;
    data: IOptions;
    samples: ISampleQuests[];
}
export interface IRepeatableTemplates {
    Elimination: IQuest;
    Completion: IQuest;
    Exploration: IQuest;
}
export interface IPmcDataRepeatableQuest {
    id?: string;
    name: string;
    activeQuests: IRepeatableQuest[];
    inactiveQuests: IRepeatableQuest[];
    endTime: number;
    changeRequirement: Record<string, IChangeRequirement>;
}
export interface IChangeRequirement {
    changeCost: IChangeCost[];
    changeStandingCost: number;
}
export interface IChangeCost {
    templateId: string;
    count: number;
}
export interface IRewardOptions {
    itemsBlacklist: string[];
}
export interface IOptions {
    Completion: ICompletionFilter;
}
export interface ICompletionFilter {
    itemsBlacklist: ItemsBlacklist[];
    itemsWhitelist: ItemsWhitelist[];
}
export interface ItemsBlacklist {
    minPlayerLevel: number;
    itemIds: string[];
}
export interface ItemsWhitelist {
    minPlayerLevel: number;
    itemIds: string[];
}
export interface ISampleQuests {
    _id: string;
    traderId: string;
    location: string;
    image: string;
    type: string;
    isKey: boolean;
    restartable: boolean;
    instantComplete: boolean;
    secretQuest: boolean;
    canShowNotificationsInGame: boolean;
    rewards: IQuestRewards;
    conditions: IQuestConditionTypes;
    name: string;
    note: string;
    description: string;
    successMessageText: string;
    failMessageText: string;
    startedMessageText: string;
    templateId: string;
}
