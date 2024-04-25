import { TraderController } from "@spt-aki/controllers/TraderController";
import { OnLoad } from "@spt-aki/di/OnLoad";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
