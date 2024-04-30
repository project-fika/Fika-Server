import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IBarterScheme } from "@spt-aki/models/eft/common/tables/ITrader";
export interface ICreateFenceAssortsResult {
    sptItems: Item[][];
    barter_scheme: Record<string, IBarterScheme[][]>;
    loyal_level_items: Record<string, number>;
}
