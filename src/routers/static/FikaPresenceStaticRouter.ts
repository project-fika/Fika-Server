import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { FikaPresenceCallbacks } from "../../callbacks/FikaPresenceCallbacks";
import { IFikaPlayerPresence } from "../../models/fika/presence/IFikaPlayerPresence";

@injectable()
export class FikaPresenceStaticRouter extends StaticRouter {
    constructor(@inject("FikaPresenceCallbacks") protected fikaPresenceCallbacks: FikaPresenceCallbacks) {
        super([
            // biome-ignore lint/correctness/noUnusedVariables: Not necessary for this endpoint, but keep it as it is standard.
            new RouteAction("/fika/presence/get", async (url: string, info: any, sessionID: string, _output: string): Promise<IFikaPlayerPresence> => {
                return this.fikaPresenceCallbacks.handleGetPresence();
            }),
        ]);
    }
}
