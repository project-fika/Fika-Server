import type { PrestigeController } from "@spt/controllers/PrestigeController";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { INotifierChannel } from "@spt/models/eft/notifier/INotifier";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class PrestigeCallbacks {
    protected httpServerHelper: HttpServerHelper;
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected prestigeController: PrestigeController;
    constructor(httpServerHelper: HttpServerHelper, httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, prestigeController: PrestigeController);
    /** Handle client/prestige/list */
    getPrestige(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<INotifierChannel>;
    /** Handle client/prestige/obtain */
    obtainPrestige(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<INotifierChannel>;
}
