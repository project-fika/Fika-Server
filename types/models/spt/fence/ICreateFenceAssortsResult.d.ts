import type { IItem } from "@spt/models/eft/common/tables/IItem";
import type { IBarterScheme } from "@spt/models/eft/common/tables/ITrader";
export interface ICreateFenceAssortsResult {
    sptItems: IItem[][];
    barter_scheme: Record<string, IBarterScheme[][]>;
    loyal_level_items: Record<string, number>;
}
