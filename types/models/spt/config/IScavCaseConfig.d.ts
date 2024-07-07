import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IScavCaseConfig extends IBaseConfig {
    kind: "spt-scavcase";
    rewardItemValueRangeRub: Record<string, MinMax>;
    moneyRewards: MoneyRewards;
    ammoRewards: AmmoRewards;
    rewardItemParentBlacklist: string[];
    rewardItemBlacklist: string[];
    allowMultipleMoneyRewardsPerRarity: boolean;
    allowMultipleAmmoRewardsPerRarity: boolean;
    allowBossItemsAsRewards: boolean;
}
export interface MoneyRewards {
    moneyRewardChancePercent: number;
    rubCount: MoneyLevels;
    usdCount: MoneyLevels;
    eurCount: MoneyLevels;
    gpCount: MoneyLevels;
}
export interface MoneyLevels {
    common: MinMax;
    rare: MinMax;
    superrare: MinMax;
}
export interface AmmoRewards {
    ammoRewardChancePercent: number;
    ammoRewardBlacklist: Record<string, string[]>;
    ammoRewardValueRangeRub: Record<string, MinMax>;
    minStackSize: number;
}
