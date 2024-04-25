import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { Traders } from "@spt-aki/models/enums/Traders";
export interface CustomTraderAssortData {
    traderId: Traders;
    assorts: ITraderAssort;
}
