import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
export interface ITraderCallbacks {
    load(): void;
    getTraderSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase[]>;
    getTrader(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase>;
    getAssort(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderAssort>;
    update(): boolean;
}
