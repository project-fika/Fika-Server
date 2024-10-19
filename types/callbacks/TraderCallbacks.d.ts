import { TraderController } from "@spt/controllers/TraderController";
import { OnLoad } from "@spt/di/OnLoad";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IModdedTraders } from "@spt/models/spt/config/ITraderConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class TraderCallbacks implements OnLoad, OnUpdate {
    protected httpResponse: HttpResponseUtil;
    protected traderController: TraderController;
    protected configServer: ConfigServer;
    constructor(httpResponse: HttpResponseUtil, // TODO: delay required
    traderController: TraderController, configServer: ConfigServer);
    onLoad(): Promise<void>;
    onUpdate(): Promise<boolean>;
    getRoute(): string;
    /** Handle client/trading/api/traderSettings */
    getTraderSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase[]>;
    /** Handle client/trading/api/getTrader */
    getTrader(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase>;
    /** Handle client/trading/api/getTraderAssort */
    getAssort(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderAssort>;
    /** Handle /singleplayer/moddedTraders */
    getModdedTraderData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IModdedTraders>;
}
