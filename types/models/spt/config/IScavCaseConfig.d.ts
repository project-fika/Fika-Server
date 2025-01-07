import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IScavCaseConfig extends IBaseConfig {
    kind: "spt-scavcase";
    rewardItemValueRangeRub: Record<string, MinMax>;
    moneyRewards: IMoneyRewards;
    ammoRewards: IAmmoRewards;
    rewardItemParentBlacklist: string[];
    rewardItemBlacklist: string[];
    allowMultipleMoneyRewardsPerRarity: boolean;
    allowMultipleAmmoRewardsPerRarity: boolean;
    allowBossItemsAsRewards: boolean;
}
export interface IMoneyRewards {
    moneyRewardChancePercent: number;
    rubCount: IMoneyLevels;
    usdCount: IMoneyLevels;
    eurCount: IMoneyLevels;
    gpCount: IMoneyLevels;
}
export interface IMoneyLevels {
    common: MinMax;
    rare: MinMax;
    superrare: MinMax;
}
export interface IAmmoRewards {
    ammoRewardChancePercent: number;
    ammoRewardBlacklist: Record<string, string[]>;
    ammoRewardValueRangeRub: Record<string, MinMax>;
    minStackSize: number;
}
