import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { IFikaPlayerPresence } from "../../services/FikaPresenceService";
import { FikaPresenceCallbacks } from "../../callbacks/FikaPresenceCallbacks";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";

@injectable()
export class FikaPresenceStaticRouter extends StaticRouter {
    constructor(@inject("FikaPresenceCallbacks") protected fikaPresenceCallbacks: FikaPresenceCallbacks) {
        super([
            // biome-ignore lint/correctness/noUnusedVariables: Not necessary for this endpoint, but keep it as it is standard.
            new RouteAction("/fika/presence/get", async (url: string, info: any, sessionID: string, _output: string): Promise<IGetBodyResponseData<IFikaPlayerPresence[]>> => {
                return this.fikaPresenceCallbacks.handleGetPresence();
            }),
        ]);
    }
}
