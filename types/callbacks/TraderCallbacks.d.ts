import { TraderController } from "@spt/controllers/TraderController";
import { OnLoad } from "@spt/di/OnLoad";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class TraderCallbacks implements OnLoad, OnUpdate {
    protected httpResponse: HttpResponseUtil;
    protected traderController: TraderController;
    constructor(httpResponse: HttpResponseUtil, // TODO: delay required
    traderController: TraderController);
    onLoad(): Promise<void>;
    onUpdate(): Promise<boolean>;
    getRoute(): string;
    /** Handle client/trading/api/traderSettings */
    getTraderSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase[]>;
    /** Handle client/trading/api/getTrader */
    getTrader(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase>;
    /** Handle client/trading/api/getTraderAssort */
    getAssort(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderAssort>;
}
