export interface IProcessRagfairTradeRequestData {
    Action: string;
    offers: IOfferRequest[];
}
export interface IOfferRequest {
    id: string;
    count: number;
    items: IItemReqeust[];
}
export interface IItemReqeust {
    id: string;
    count: number;
}
