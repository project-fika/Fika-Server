import { IQuestConditionTypes } from "@spt/models/eft/common/tables/IQuest";
import { IReward } from "@spt/models/eft/common/tables/IReward";
export interface IAchievement {
    id: string;
    imageUrl: string;
    assetPath: string;
    rewards: IReward[];
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
