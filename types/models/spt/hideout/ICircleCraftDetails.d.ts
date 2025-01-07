import { CircleRewardType } from "@spt/models/enums/hideout/CircleRewardType";
import { ICraftTimeThreshhold } from "@spt/models/spt/config/IHideoutConfig";
export interface ICircleCraftDetails {
    time: number;
    rewardType: CircleRewardType;
    rewardAmountRoubles: number;
    rewardDetails?: ICraftTimeThreshhold;
}
