import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { FikaPresenceService } from "../services/FikaPresenceService";
import { IFikaPlayerPresence } from "../models/fika/presence/IFikaPlayerPresence";
import { IFikaSetPresence } from "../models/fika/presence/IFikaSetPresence";

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
        this.fikaPresenceService.updatePlayerPresence(sessionID, data);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/presence/setget */
    public handleSetGetPresence(_url: string, data: IFikaSetPresence, sessionID: string): IFikaPlayerPresence {
        this.fikaPresenceService.updatePlayerPresence(sessionID, data);

        return this.httpResponseUtil.noBody(this.fikaPresenceService.getAllPlayersPresence());
    }
}
