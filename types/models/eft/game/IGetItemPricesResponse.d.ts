export interface IGetItemPricesResponse {
    supplyNextTime: number;
    prices: Record<string, number>;
    currencyCourses: Record<string, number>;
}
