import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig, IRunIntervalValues } from "@spt/models/spt/config/IBaseConfig";
export interface IHideoutConfig extends IBaseConfig {
    kind: "spt-hideout";
    /** How many seconds should pass before hideout crafts / fuel usage is checked and procesed */
    runIntervalSeconds: number;
    /** Default values used to hydrate `runIntervalSeconds` with */
    runIntervalValues: IRunIntervalValues;
    hoursForSkillCrafting: number;
    expCraftAmount: number;
    overrideCraftTimeSeconds: number;
    overrideBuildTimeSeconds: number;
    /** Only process a profiles hideout crafts when it has been active in the last x minutes */
    updateProfileHideoutWhenActiveWithinMinutes: number;
    cultistCircle: ICultistCircleSettings;
}
export interface ICultistCircleSettings {
    maxRewardItemCount: number;
    maxAttemptsToPickRewardsWithinBudget: number;
    rewardPriceMultiplerMinMax: MinMax;
    craftTimeThreshholds: ICraftTimeThreshhold[];
    /** -1 means no override */
    craftTimeOverride: number;
    /** Specific reward pool when player sacrificed one specific item */
    directRewards: Record<string, IDirectRewardSettings>;
    directRewardStackSize: Record<string, MinMax>;
    /** Item tpls to exclude from the reward pool */
    rewardItemBlacklist: string[];
    /** Item tpls to include in the reward pool */
    additionalRewardItemPool: string[];
    currencyRewards: Record<string, MinMax>;
}
export interface ICraftTimeThreshhold extends MinMax {
    craftTimeSeconds: number;
}
export interface IDirectRewardSettings {
    rewardTpls: string[];
    craftTimeSeconds: number;
}
