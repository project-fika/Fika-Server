import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { EFikaPlayerPresences } from "../models/enums/EFikaPlayerPresences";
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
        data.activity = this.setActivityValue(data.activity);

        this.fikaPresenceService.updatePlayerPresence(sessionID, data);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/presence/setget */
    public handleSetGetPresence(_url: string, data: IFikaSetPresence, sessionID: string): IFikaPlayerPresence {
        data.activity = this.setActivityValue(data.activity);

        this.fikaPresenceService.updatePlayerPresence(sessionID, data);

        return this.httpResponseUtil.noBody(this.fikaPresenceService.getAllPlayersPresence());
    }

    protected setActivityValue(presence: EFikaPlayerPresences): EFikaPlayerPresences {
        if (Object.keys(EFikaPlayerPresences).includes(presence.toString())) {
            presence = EFikaPlayerPresences[presence.toString()];
        }

        return presence;
    }
}
