import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { FikaPresenceCallbacks } from "../../callbacks/FikaPresenceCallbacks";
import { IFikaPlayerPresenceResponse } from "../../services/FikaPresenceService";

@injectable()
export class FikaPresenceStaticRouter extends StaticRouter {
    constructor(@inject("FikaPresenceCallbacks") protected fikaPresenceCallbacks: FikaPresenceCallbacks) {
        super([
            // biome-ignore lint/correctness/noUnusedVariables: Not necessary for this endpoint, but keep it as it is standard.
            new RouteAction("/fika/presence/get", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaPresenceCallbacks.handleGetPresence();
            }),
        ]);
    }
}
