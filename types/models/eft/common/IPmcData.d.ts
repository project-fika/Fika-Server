import { IBotBase, IEftStats } from "@spt/models/eft/common/tables/IBotBase";
export interface IPmcData extends IBotBase {
}
export interface IPostRaidPmcData extends IBotBase {
    Stats: IPostRaidStats;
}
export interface IPostRaidStats {
    Eft: IEftStats;
    /** Only found in profile we get from client post raid */
    Arena: IEftStats;
}
