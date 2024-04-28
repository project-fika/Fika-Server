import { inject, injectable } from "tsyringe";

import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { RouteAction, StaticRouter } from "@spt-aki/di/Router";

import { FikaLocationCallbacks } from "../../callbacks/FikaLocationCallbacks";

@injectable()
export class FikaLocationStaticRouter extends StaticRouter {
    constructor(
        @inject("FikaLocationCallbacks") protected fikaLocationCallbacks: FikaLocationCallbacks
    ) {
        super([
            new RouteAction(
                "/fika/location/raids",
                async (url: string, info: IGetRaidConfigurationRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaLocationCallbacks.handleGetRaids(url, info, sessionID);
                }
            )
        ]);
    }
}
