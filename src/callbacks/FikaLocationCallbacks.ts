import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaLocationController } from "../controllers/FikaLocationController";

@injectable()
export class FikaLocationCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaLocationController") protected fikaLocationController: FikaLocationController,
    ) {
        // empty
    }

    /** Handle /fika/location/raids */
    public handleGetRaids(_url: string, info: IGetRaidConfigurationRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaLocationController.handleGetRaids(info));
    }
}
