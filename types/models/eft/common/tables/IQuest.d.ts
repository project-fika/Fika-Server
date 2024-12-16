import { IItem } from "@spt/models/eft/common/tables/IItem";
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
    restartable: boolean;
    instantComplete: boolean;
    secretQuest: boolean;
    startedMessageText: string;
    successMessageText: string;
    acceptPlayerMessage?: string;
    declinePlayerMessage: string;
    completePlayerMessage?: string;
    templateId?: string;
    rewards: IQuestRewards;
    /** Becomes 'AppearStatus' inside client */
    status?: string | number;
    KeyQuest?: boolean;
    changeQuestMessageText: string;
    /** "Pmc" or "Scav" */
    side: string;
    acceptanceAndFinishingSource: string;
    progressSource: string;
    rankingModes: string[];
    gameModes: string[];
    arenaLocations: string[];
    /** Status of quest to player */
    sptStatus?: QuestStatus;
}
export interface IQuestConditionTypes {
    Started?: IQuestCondition[];
    AvailableForFinish: IQuestCondition[];
    AvailableForStart: IQuestCondition[];
    Success?: IQuestCondition[];
    Fail: IQuestCondition[];
}
export interface IQuestCondition {
    id: string;
    index?: number;
    compareMethod?: string;
    dynamicLocale: boolean;
    visibilityConditions?: IVisibilityCondition[];
    globalQuestCounterId?: string;
    parentId?: string;
    target?: string[] | string;
    value?: string | number;
    type?: boolean | string;
    status?: QuestStatus[];
    availableAfter?: number;
    dispersion?: number;
    onlyFoundInRaid?: boolean;
    oneSessionOnly?: boolean;
    isResetOnConditionFailed?: boolean;
    isNecessary?: boolean;
    doNotResetIfCounterCompleted?: boolean;
    dogtagLevel?: number | string;
    traderId?: string;
    maxDurability?: number | string;
    minDurability?: number | string;
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
    dynamicLocale?: boolean;
    target?: string[] | string;
    completeInSeconds?: number;
    energy?: IValueCompare;
    exitName?: string;
    hydration?: IValueCompare;
    time?: IValueCompare;
    compareMethod?: string;
    value?: number | string;
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
export interface IVisibilityCondition {
    id: string;
    target: string;
    value?: number;
    dynamicLocale?: boolean;
    oneSessionOnly?: boolean;
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
    items?: IItem[];
    loyaltyLevel?: number;
    /** Hideout area id */
    traderId?: string;
    isEncoded?: boolean;
    unknown?: boolean;
    findInRaid?: boolean;
    gameMode?: string[];
    /** Game editions whitelisted to get reward */
    availableInGameEditions?: string[];
    /** Game editions blacklisted from getting reward */
    notAvailableInGameEditions?: string[];
}
