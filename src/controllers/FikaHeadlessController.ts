import { inject, injectable } from "tsyringe";

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
    ) {}

    /**
     * Handle /fika/headless/get
     */
    public handleGetHeadlesses(): IHeadlessClients {
        const data: IHeadlessClients = {
            headlesses: this.fikaHeadlessHelper.getHeadlessClients(),
        };

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
}
