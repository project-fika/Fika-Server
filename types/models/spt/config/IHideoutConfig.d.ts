import { MinMax } from "@spt/models/common/MinMax";
import { IRequirement } from "@spt/models/eft/hideout/IHideoutProduction";
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
    hideoutCraftsToAdd: IHideoutCraftToAdd[];
}
export interface IHideoutCraftToAdd {
    newId: string;
    requirements: IRequirement[];
    craftIdToCopy: string;
    craftOutputTpl: string;
}
export interface ICultistCircleSettings {
    maxRewardItemCount: number;
    maxAttemptsToPickRewardsWithinBudget: number;
    rewardPriceMultiplerMinMax: MinMax;
    /** The odds that meeting the highest threshold gives you a bonus to crafting time */
    bonusAmountMultiplier: number;
    bonusChanceMultiplier: number;
    /** What is considered a "high-value" item */
    highValueThresholdRub: number;
    /** Hideout/task reward crafts have a unique craft time */
    hideoutTaskRewardTimeSeconds: number;
    /** Rouble amount player needs to sacrifice to get chance of hideout/task rewards */
    hideoutCraftSacrificeThresholdRub: number;
    craftTimeThreshholds: ICraftTimeThreshhold[];
    /** -1 means no override, value in seconds */
    craftTimeOverride: number;
    /** Specific reward pool when player sacrifice specific item(s) */
    directRewards: IDirectRewardSettings[];
    /** Overrides for reward stack sizes, keyed by item tpl */
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
    reward: string[];
    requiredItems: string[];
    craftTimeSeconds: number;
    /** Is the reward a one time reward or can it be given multiple times */
    repeatable: boolean;
}
