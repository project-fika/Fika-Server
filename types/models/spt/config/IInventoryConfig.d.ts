import type { MinMax } from "@spt/models/common/MinMax";
import type { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IInventoryConfig extends IBaseConfig {
    kind: "spt-inventory";
    /** Should new items purchased by flagged as found in raid */
    newItemsMarkedFound: boolean;
    randomLootContainers: Record<string, IRewardDetails>;
    sealedAirdropContainer: ISealedAirdropContainerSettings;
    /** Contains item tpls that the server should consider money and treat the same as roubles/euros/dollars */
    customMoneyTpls: string[];
    /** Multipliers for skill gain when inside menus, NOT in-game */
    skillGainMultiplers: Record<string, number>;
    /** Container Tpls that shoud be deprioritised when choosing where to take money from for payments */
    deprioritisedMoneyContainers: string[];
}
export interface IRewardDetails {
    rewardCount: number;
    foundInRaid: boolean;
    rewardTplPool?: Record<string, number>;
    rewardTypePool?: string[];
}
export interface ISealedAirdropContainerSettings {
    weaponRewardWeight: Record<string, number>;
    defaultPresetsOnly: boolean;
    /** Should contents be flagged as found in raid when opened */
    foundInRaid: boolean;
    weaponModRewardLimits: Record<string, MinMax>;
    rewardTypeLimits: Record<string, MinMax>;
    ammoBoxWhitelist: string[];
    allowBossItems: boolean;
}
