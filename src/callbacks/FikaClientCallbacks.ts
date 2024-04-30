import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { FikaClientController } from "../controllers/FikaClientController";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";

@injectable()
export class FikaClientCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaClientController") protected fikaClientController: FikaClientController,
    ) {
        // empty
    }

    /** Handle /fika/client/config */
    public handleClientConfig(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleClientConfig());
    }
}
