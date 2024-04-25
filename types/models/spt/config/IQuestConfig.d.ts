import { MinMax } from "@spt-aki/models/common/MinMax";
import { ELocationName } from "@spt-aki/models/enums/ELocationName";
import { SeasonalEventType } from "@spt-aki/models/enums/SeasonalEventType";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IQuestConfig extends IBaseConfig {
    kind: "aki-quest";
    redeemTime: number;
    questTemplateIds: IPlayerTypeQuestIds;
    /** Show non-seasonal quests be shown to player */
    showNonSeasonalEventQuests: boolean;
    eventQuests: Record<string, IEventQuestData>;
    repeatableQuests: IRepeatableQuestConfig[];
    locationIdMap: Record<string, string>;
    bearOnlyQuests: string[];
    usecOnlyQuests: string[];
}
export interface IPlayerTypeQuestIds {
    pmc: IQuestTypeIds;
    scav: IQuestTypeIds;
}
export interface IQuestTypeIds {
    Elimination: string;
    Completion: string;
    Exploration: string;
}
export interface IEventQuestData {
    name: string;
    season: SeasonalEventType;
    startTimestamp: number;
    endTimestamp: number;
    yearly: boolean;
}
export interface IRepeatableQuestConfig {
    id: string;
    name: string;
    side: string;
    types: string[];
    resetTime: number;
    numQuests: number;
    minPlayerLevel: number;
    rewardScaling: IRewardScaling;
    locations: Record<ELocationName, string[]>;
    traderWhitelist: ITraderWhitelist[];
    questConfig: IRepeatableQuestTypesConfig;
    /** Item base types to block when generating rewards */
    rewardBaseTypeBlacklist: string[];
    /** Item tplIds to ignore when generating rewards */
    rewardBlacklist: string[];
    rewardAmmoStackMinSize: number;
}
export interface IRewardScaling {
    levels: number[];
    experience: number[];
    roubles: number[];
    items: number[];
    reputation: number[];
    rewardSpread: number;
    skillRewardChance: number[];
    skillPointReward: number[];
}
export interface ITraderWhitelist {
    traderId: string;
    questTypes: string[];
    rewardBaseWhitelist: string[];
    rewardCanBeWeapon: boolean;
    weaponRewardChancePercent: number;
}
export interface IRepeatableQuestTypesConfig {
    Exploration: IExploration;
    Completion: ICompletion;
    Pickup: IPickup;
    Elimination: IEliminationConfig[];
}
export interface IExploration extends IBaseQuestConfig {
    maxExtracts: number;
    maxExtractsWithSpecificExit: number;
    specificExits: ISpecificExits;
}
export interface ISpecificExits {
    probability: number;
    passageRequirementWhitelist: string[];
}
export interface ICompletion extends IBaseQuestConfig {
    minRequestedAmount: number;
    maxRequestedAmount: number;
    uniqueItemCount: number;
    minRequestedBulletAmount: number;
    maxRequestedBulletAmount: number;
    useWhitelist: boolean;
    useBlacklist: boolean;
}
export interface IPickup extends IBaseQuestConfig {
    ItemTypeToFetchWithMaxCount: IPickupTypeWithMaxCount[];
}
export interface IPickupTypeWithMaxCount {
    itemType: string;
    maxPickupCount: number;
    minPickupCount: number;
}
export interface IEliminationConfig extends IBaseQuestConfig {
    levelRange: MinMax;
    targets: ITarget[];
    bodyPartProb: number;
    bodyParts: IBodyPart[];
    specificLocationProb: number;
    distLocationBlacklist: string[];
    distProb: number;
    maxDist: number;
    minDist: number;
    maxKills: number;
    minKills: number;
    minBossKills: number;
    maxBossKills: number;
    minPmcKills: number;
    maxPmcKills: number;
    weaponCategoryRequirementProb: number;
    weaponCategoryRequirements: IWeaponRequirement[];
    weaponRequirementProb: number;
    weaponRequirements: IWeaponRequirement[];
}
export interface IBaseQuestConfig {
    possibleSkillRewards: string[];
}
export interface ITarget extends IProbabilityObject {
    data: IBossInfo;
}
export interface IBossInfo {
    isBoss: boolean;
    isPmc: boolean;
}
export interface IBodyPart extends IProbabilityObject {
    data: string[];
}
export interface IWeaponRequirement extends IProbabilityObject {
    data: string[];
}
export interface IProbabilityObject {
    key: string;
    relativeProbability: number;
    data?: any;
}
