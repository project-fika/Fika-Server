import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";

import { IFikaRaidServerIdRequestData } from "../../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { FikaClientCallbacks } from "../../callbacks/FikaClientCallbacks";

@injectable()
export class FikaClientStaticRouter extends StaticRouter {
    constructor(
        @inject("FikaClientCallbacks") protected fikaClientCallbacks: FikaClientCallbacks
    ) {
        super([
            new RouteAction(
                "/fika/client/config",
                (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, output: string): string => {
                    return this.fikaClientCallbacks.handleClientConfig(url, info, sessionID);
                }
            )
        ]);
    }
}
