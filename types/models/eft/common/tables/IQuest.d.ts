import { Item } from "@spt/models/eft/common/tables/IItem";
import { QuestRewardType } from "@spt/models/enums/QuestRewardType";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import { QuestTypeEnum } from "@spt/models/enums/QuestTypeEnum";
export interface IQuest {
    /** SPT addition - human readable quest name */
    QuestName?: string;
    _id: string;
    canShowNotificationsInGame: boolean;
    conditions: IQuestConditionTypes;
    description: string;
    failMessageText: string;
    name: string;
    note: string;
    traderId: string;
    location: string;
    image: string;
    type: QuestTypeEnum;
    isKey: boolean;
    /** @deprecated - Likely not used, use 'status' instead */
    questStatus: QuestStatus;
    restartable: boolean;
    instantComplete: boolean;
    secretQuest: boolean;
    startedMessageText: string;
    successMessageText: string;
    acceptPlayerMessage: string;
    declinePlayerMessage: string;
    completePlayerMessage: string;
    templateId: string;
    rewards: IQuestRewards;
    /** Becomes 'AppearStatus' inside client */
    status: string | number;
    KeyQuest: boolean;
    changeQuestMessageText: string;
    /** "Pmc" or "Scav" */
    side: string;
    /** Status of quest to player */
    sptStatus?: QuestStatus;
}
export interface IQuestConditionTypes {
    Started: IQuestCondition[];
    AvailableForFinish: IQuestCondition[];
    AvailableForStart: IQuestCondition[];
    Success: IQuestCondition[];
    Fail: IQuestCondition[];
}
export interface IQuestCondition {
    id: string;
    index?: number;
    compareMethod?: string;
    dynamicLocale: boolean;
    visibilityConditions?: VisibilityCondition[];
    globalQuestCounterId?: string;
    parentId?: string;
    target: string[] | string;
    value?: string | number;
    type?: boolean;
    status?: QuestStatus[];
    availableAfter?: number;
    dispersion?: number;
    onlyFoundInRaid?: boolean;
    oneSessionOnly?: boolean;
    doNotResetIfCounterCompleted?: boolean;
    dogtagLevel?: number;
    maxDurability?: number;
    minDurability?: number;
    counter?: IQuestConditionCounter;
    plantTime?: number;
    zoneId?: string;
    countInRaid?: boolean;
    completeInSeconds?: number;
    isEncoded?: boolean;
    conditionType?: string;
}
export interface IQuestConditionCounter {
    id: string;
    conditions: IQuestConditionCounterCondition[];
}
export interface IQuestConditionCounterCondition {
    id: string;
    dynamicLocale: boolean;
    target?: string[] | string;
    completeInSeconds?: number;
    energy?: IValueCompare;
    exitName?: string;
    hydration?: IValueCompare;
    time?: IValueCompare;
    compareMethod?: string;
    value?: number;
    weapon?: string[];
    distance?: ICounterConditionDistance;
    equipmentInclusive?: string[][];
    weaponModsInclusive?: string[][];
    weaponModsExclusive?: string[][];
    enemyEquipmentInclusive?: string[][];
    enemyEquipmentExclusive?: string[][];
    weaponCaliber?: string[];
    savageRole?: string[];
    status?: string[];
    bodyPart?: string[];
    daytime?: IDaytimeCounter;
    conditionType?: string;
    enemyHealthEffects?: IEnemyHealthEffect[];
    resetOnSessionEnd?: boolean;
}
export interface IEnemyHealthEffect {
    bodyParts: string[];
    effects: string[];
}
export interface IValueCompare {
    compareMethod: string;
    value: number;
}
export interface ICounterConditionDistance {
    value: number;
    compareMethod: string;
}
export interface IDaytimeCounter {
    from: number;
    to: number;
}
export interface VisibilityCondition {
    id: string;
    target: string;
    value?: number;
    dynamicLocale?: boolean;
    oneSessionOnly: boolean;
    conditionType: string;
}
export interface IQuestRewards {
    AvailableForStart?: IQuestReward[];
    AvailableForFinish?: IQuestReward[];
    Started?: IQuestReward[];
    Success?: IQuestReward[];
    Fail?: IQuestReward[];
    FailRestartable?: IQuestReward[];
    Expired?: IQuestReward[];
}
export interface IQuestReward {
    value?: string | number;
    id?: string;
    type: QuestRewardType;
    index: number;
    target?: string;
    items?: Item[];
    loyaltyLevel?: number;
    /** Hideout area id */
    traderId?: string;
    unknown?: boolean;
    findInRaid?: boolean;
}
