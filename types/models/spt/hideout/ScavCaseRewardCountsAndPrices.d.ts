export interface ScavCaseRewardCountsAndPrices {
    Common: RewardCountAndPriceDetails;
    Rare: RewardCountAndPriceDetails;
    Superrare: RewardCountAndPriceDetails;
}
export interface RewardCountAndPriceDetails {
    minCount: number;
    maxCount: number;
    minPriceRub: number;
    maxPriceRub: number;
}
