import { ITraderAssort } from "@spt/models/eft/common/tables/ITrader";
import { Traders } from "@spt/models/enums/Traders";
export interface CustomTraderAssortData {
    traderId: Traders;
    assorts: ITraderAssort;
}
