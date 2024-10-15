import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IFikaPlayerPresence } from "../models/fika/presence/IFikaPlayerPresence";
import { IFikaSetPresence } from "../models/fika/presence/IFikaSetPresence";
import { FikaPresenceService } from "../services/FikaPresenceService";

@injectable()
export class FikaPresenceCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaPresenceService") protected fikaPresenceService: FikaPresenceService,
    ) {
        // empty
    }

    /** Handle /fika/presence/get */
    public handleGetPresence(_url: string, _info: any, _sessionID: string): IFikaPlayerPresence {
        return this.httpResponseUtil.noBody(this.fikaPresenceService.getAllPlayersPresence());
    }

    /** Handle /fika/presence/set */
    public handleSetPresence(_url: string, data: IFikaSetPresence, sessionID: string): INullResponseData {
        return this.httpResponseUtil.noBody(this.fikaPresenceService.setPlayerPresence(sessionID, data));
    }

    /** Handle /fika/presence/setget */
    public handleSetGetPresence(_url: string, data: IFikaSetPresence, sessionID: string): IFikaPlayerPresence {
        this.fikaPresenceService.setPlayerPresence(sessionID, data);

        return this.httpResponseUtil.noBody(this.fikaPresenceService.getAllPlayersPresence());
    }
}
