import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { FikaPresenceService, IFikaPlayerPresence } from "../services/FikaPresenceService";

@injectable()
export class FikaPresenceCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaPresenceService") protected fikaPresenceService: FikaPresenceService,
    ) {
        // empty
    }

    /** Handle /fika/presence/get */
    public handleGetPresence(): IFikaPlayerPresence {
        return this.httpResponseUtil.noBody(this.fikaPresenceService.getAllPlayersPresence());
    }
}
