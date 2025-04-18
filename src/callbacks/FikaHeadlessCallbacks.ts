import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { FikaHeadlessController } from "../controllers/FikaHeadlessController";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";

@injectable()
export class FikaHeadlessCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaHeadlessController") protected fikaHeadlessController: FikaHeadlessController,
    ) {
        // empty
    }

    /** Handle /fika/headless/get */
    public handleGetHeadlesses(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaHeadlessController.handleGetHeadlesses());
    }

    /** Handle /fika/headless/available */
    public handleAvailableHeadlesses(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaHeadlessController.handleGetAvailableHeadlesses());
    }

    /** Handle /fika/headless/restartafterraidamount */
    public handleRestartAfterRaidAmount(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaHeadlessController.handleRestartAfterRaidAmount());
    }

    /** Handle /fika/headless/questtemplates */
    public handleGetAllQuestTemplates(_url: string, _info: any, _sessionID: string): IGetBodyResponseData<IQuest[]> {
        return this.httpResponseUtil.getBody(this.fikaHeadlessController.handleGetAllQuestTemplates());
    }
}
