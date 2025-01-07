import { IQuest, IQuestConditionTypes, IQuestRewards } from "@spt/models/eft/common/tables/IQuest";
export interface IRepeatableQuest extends IQuest {
    changeCost: IChangeCost[];
    changeStandingCost: number;
    sptRepatableGroupName: string;
    acceptanceAndFinishingSource: string;
    progressSource: string;
    rankingModes: string[];
    gameModes: string[];
    arenaLocations: string[];
    questStatus: IRepeatableQuestStatus;
}
export interface IRepeatableQuestDatabase {
    templates: IRepeatableTemplates;
    rewards: IRewardOptions;
    data: IOptions;
    samples: ISampleQuests[];
}
export interface IRepeatableQuestStatus {
    id: string;
    uid: string;
    qid: string;
    startTime: number;
    status: number;
    statusTimers: any;
}
export interface IRepeatableTemplates {
    Elimination: IQuest;
    Completion: IQuest;
    Exploration: IQuest;
}
export interface IPmcDataRepeatableQuest {
    id?: string;
    name: string;
    unavailableTime?: string;
    activeQuests: IRepeatableQuest[];
    inactiveQuests: IRepeatableQuest[];
    endTime: number;
    changeRequirement: Record<string, IChangeRequirement>;
    freeChanges: number;
    freeChangesAvailable: number;
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
    itemsBlacklist: IItemsBlacklist[];
    itemsWhitelist: IItemsWhitelist[];
}
export interface IItemsBlacklist {
    minPlayerLevel: number;
    itemIds: string[];
}
export interface IItemsWhitelist {
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
