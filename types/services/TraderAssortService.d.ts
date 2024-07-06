import { ITraderAssort } from "@spt/models/eft/common/tables/ITrader";
export declare class TraderAssortService {
    protected pristineTraderAssorts: Record<string, ITraderAssort>;
    getPristineTraderAssort(traderId: string): ITraderAssort;
    /**
     * Store trader assorts inside a class property
     * @param traderId Traderid to store assorts against
     * @param assort Assorts to store
     */
    setPristineTraderAssort(traderId: string, assort: ITraderAssort): void;
}
