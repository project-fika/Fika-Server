import { inject, injectable } from "tsyringe";

import { QuestHelper } from "@spt/helpers/QuestHelper";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import { FikaHeadlessHelper } from "../helpers/FikaHeadlessHelper";
import { IHeadlessAvailableClients } from "../models/fika/headless/IHeadlessAvailableClients";
import { IHeadlessClients } from "../models/fika/headless/IHeadlessClients";
import { IHeadlessRestartAfterAmountOfRaids } from "../models/fika/headless/IHeadlessRestartAfterAmountOfRaids";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaHeadlessController {
    constructor(
        @inject("FikaHeadlessHelper") protected fikaHeadlessHelper: FikaHeadlessHelper,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("QuestHelper") protected questHelper: QuestHelper,
    ) {}

    /**
     * Handle /fika/headless/get
     */
    public handleGetHeadlesses(): IHeadlessClients {
        const data: IHeadlessClients = {
            headlesses: {},
        };

        for (const [headlessSessionID, headless] of this.fikaHeadlessHelper.getHeadlessClients()) {
            data.headlesses[headlessSessionID] = {
                state: headless.state,
                players: headless.players,
                requesterSessionID: headless.requesterSessionID,
                hasNotifiedRequester: headless.hasNotifiedRequester,
            };
        }

        return data;
    }

    /**
     * Handle /fika/headless/available
     */
    public handleGetAvailableHeadlesses(): IHeadlessAvailableClients[] {
        return this.fikaHeadlessHelper.getAvailableHeadlessClients();
    }

    /**
     * Handle /fika/headless/restartafterraidamount
     */
    public handleRestartAfterRaidAmount(): IHeadlessRestartAfterAmountOfRaids {
        const data: IHeadlessRestartAfterAmountOfRaids = {
            amount: this.fikaConfig.getConfig().headless.restartAfterAmountOfRaids,
        };

        return data;
    }

    /**
     * Handle /fika/headless/questtemplates
     */
    public handleGetAllQuestTemplates(): IQuest[] {
        const quests = this.questHelper.getQuestsFromDb();

        for (const quest of quests) {
            quest.sptStatus = QuestStatus.AvailableForStart;
        }

        return quests;
    }
}
