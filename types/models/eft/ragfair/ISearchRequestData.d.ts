import { RagfairSort } from "@spt-aki/models/enums/RagfairSort";
export interface ISearchRequestData {
    page: number;
    limit: number;
    sortType: RagfairSort;
    sortDirection: number;
    currency: number;
    priceFrom: number;
    priceTo: number;
    quantityFrom: number;
    quantityTo: number;
    conditionFrom: number;
    conditionTo: number;
    oneHourExpiration: boolean;
    removeBartering: boolean;
    offerOwnerType: OfferOwnerType;
    onlyFunctional: boolean;
    updateOfferCount: boolean;
    handbookId: string;
    linkedSearchId: string;
    neededSearchId: string;
    buildItems: BuildItems;
    buildCount: number;
    tm: number;
    reload: number;
}
export declare enum OfferOwnerType {
    ANYOWNERTYPE = 0,
    TRADEROWNERTYPE = 1,
    PLAYEROWNERTYPE = 2
}
export interface BuildItems {
}
