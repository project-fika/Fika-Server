import { IProcessBaseTradeRequestData } from "@spt/models/eft/trade/IProcessBaseTradeRequestData";
export interface IProcessSellTradeRequestData extends IProcessBaseTradeRequestData {
    Action: "sell_to_trader";
    type: string;
    tid: string;
    price: number;
    items: ISoldItem[];
}
export interface ISoldItem {
    id: string;
    count: number;
    scheme_id: number;
}
