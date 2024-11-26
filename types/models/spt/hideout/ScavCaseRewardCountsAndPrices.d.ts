export interface IScavCaseRewardCountsAndPrices {
    Common: IRewardCountAndPriceDetails;
    Rare: IRewardCountAndPriceDetails;
    Superrare: IRewardCountAndPriceDetails;
}
export interface IRewardCountAndPriceDetails {
    minCount: number;
    maxCount: number;
    minPriceRub: number;
    maxPriceRub: number;
}
