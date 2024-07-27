import { Item } from "@spt/models/eft/common/tables/IItem";
import { DogtagExchangeSide } from "@spt/models/enums/DogtagExchangeSide";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
export interface IRagfairOffer {
    sellResult?: SellResult[];
    _id: string;
    items: Item[];
    requirements: OfferRequirement[];
    root: string;
    intId: number;
    /** Handbook price */
    itemsCost: number;
    /** Rouble price per item */
    requirementsCost: number;
    startTime: number;
    endTime: number;
    sellInOnePiece: boolean;
    /** Rouble price - same as requirementsCost */
    summaryCost: number;
    user: IRagfairOfferUser;
    /** Trader only */
    unlimitedCount?: boolean;
    loyaltyLevel: number;
    buyRestrictionMax?: number;
    buyRestrictionCurrent?: number;
    locked?: boolean;
}
export interface OfferRequirement {
    _tpl: string;
    count: number;
    onlyFunctional: boolean;
    level?: number;
    side?: DogtagExchangeSide;
}
export interface IRagfairOfferUser {
    id: string;
    nickname?: string;
    rating?: number;
    memberType: MemberCategory;
    selectedMemberCategory?: MemberCategory;
    avatar?: string;
    isRatingGrowing?: boolean;
    aid?: number;
}
export interface SellResult {
    sellTime: number;
    amount: number;
}
