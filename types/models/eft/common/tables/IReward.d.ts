import { RewardType } from "@spt/models/enums/RewardType";
import { IItem } from "./IItem";
export interface IReward {
    value?: string | number;
    id?: string;
    illustrationConfig?: any;
    isHidden?: boolean;
    type: RewardType;
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
