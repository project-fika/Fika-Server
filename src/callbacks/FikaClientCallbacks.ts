import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { FikaClientController } from "../controllers/FikaClientController";

@injectable()
export class FikaClientCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaClientController") protected fikaClientController: FikaClientController
    ) {
        // empty
    }

    /** Handle /fika/client/config */
    public handleClientConfig(url: string, info: IFikaRaidServerIdRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleClientConfig());
    }
}
