import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaPresenceService, IFikaPlayerPresence } from "../services/FikaPresenceService";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";

@injectable()
export class FikaPresenceCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaPresenceService") protected fikaPresenceService: FikaPresenceService,
    ) {
        // empty
    }

    /** Handle /fika/presence/get */
    public handleGetPresence(): IGetBodyResponseData<IFikaPlayerPresence[]> {
        return this.httpResponseUtil.getBody(this.fikaPresenceService.getAllPlayersPresence());
    }
}
