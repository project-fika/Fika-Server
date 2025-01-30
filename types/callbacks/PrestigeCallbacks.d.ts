import type { PrestigeController } from "@spt/controllers/PrestigeController";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IPrestige } from "@spt/models/eft/common/tables/IPrestige";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IObtainPrestigeRequest } from "@spt/models/eft/prestige/IObtainPrestigeRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class PrestigeCallbacks {
    protected httpServerHelper: HttpServerHelper;
    protected httpResponse: HttpResponseUtil;
    protected prestigeController: PrestigeController;
    constructor(httpServerHelper: HttpServerHelper, httpResponse: HttpResponseUtil, prestigeController: PrestigeController);
    /** Handle client/prestige/list */
    getPrestige(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPrestige>;
    /** Handle client/prestige/obtain */
    obtainPrestige(url: string, info: IObtainPrestigeRequest[], sessionID: string): Promise<INullResponseData>;
}
