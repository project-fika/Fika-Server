import { MinMax } from "@spt-aki/models/common/MinMax";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IScavCaseConfig extends IBaseConfig {
    kind: "aki-scavcase";
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
