import { IQuestConditionTypes, IQuestRewards } from "./IQuest";
export interface IAchievement {
    id: string;
    imageUrl: string;
    assetPath: string;
    rewards: IQuestRewards;
    conditions: IQuestConditionTypes;
    instantComplete: boolean;
    showNotificationsInGame: boolean;
    showProgress: boolean;
    prefab: string;
    rarity: string;
    hidden: boolean;
    showConditions: boolean;
    progressBarEnabled: boolean;
    side: string;
    index: number;
}
