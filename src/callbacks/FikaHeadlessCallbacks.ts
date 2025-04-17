import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { QuestHelper } from "@spt/helpers/QuestHelper";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import { IQuest } from "../../types/models/eft/common/tables/IQuest";
import { IGetBodyResponseData } from "../../types/models/eft/httpResponse/IGetBodyResponseData";
import { FikaHeadlessController } from "../controllers/FikaHeadlessController";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";

@injectable()
export class FikaHeadlessCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaHeadlessController") protected fikaHeadlessController: FikaHeadlessController,
        @inject("QuestHelper") protected questHelper: QuestHelper,
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
    public getAllQuestTemplates(_url: string, _info: any, _sessionID: string): IGetBodyResponseData<IQuest[]> {
        const quests = this.questHelper.getQuestsFromDb();
        for (const quest of quests) {
            quest.sptStatus = QuestStatus.AvailableForStart;
        }
        return this.httpResponseUtil.getBody(quests);
    }
}
