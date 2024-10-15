import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";

import { FikaPresenceCallbacks } from "../../callbacks/FikaPresenceCallbacks";
import { IFikaPlayerPresence } from "../../models/fika/presence/IFikaPlayerPresence";
import { IFikaSetPresence } from "../../models/fika/presence/IFikaSetPresence";

@injectable()
export class FikaPresenceStaticRouter extends StaticRouter {
    constructor(@inject("FikaPresenceCallbacks") protected fikaPresenceCallbacks: FikaPresenceCallbacks) {
        super([
            new RouteAction("/fika/presence/get", async (url: string, info: any, sessionID: string, _output: string): Promise<IFikaPlayerPresence> => {
                return this.fikaPresenceCallbacks.handleGetPresence(url, info, sessionID);
            }),
            new RouteAction("/fika/presence/set", async (url: string, info: IFikaSetPresence, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaPresenceCallbacks.handleSetPresence(url, info, sessionID);
            }),
            new RouteAction("/fika/presence/setget", async (url: string, info: IFikaSetPresence, sessionID: string, _output: string): Promise<IFikaPlayerPresence> => {
                return this.fikaPresenceCallbacks.handleSetGetPresence(url, info, sessionID);
            }),
        ]);
    }
}
