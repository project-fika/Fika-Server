import { IProcessBaseTradeRequestData } from "@spt/models/eft/trade/IProcessBaseTradeRequestData";
export interface IProcessBuyTradeRequestData extends IProcessBaseTradeRequestData {
    Action: "buy_from_trader" | "TradingConfirm" | "RestoreHealth" | "SptInsure" | "SptRepair" | "";
    type: string;
    tid: string;
    item_id: string;
    count: number;
    scheme_id: number;
    scheme_items: ISchemeItem[];
}
export interface ISchemeItem {
    /** Id of stack to take money from, is money tpl when Action is `SptInsure` */
    id: string;
    count: number;
}
