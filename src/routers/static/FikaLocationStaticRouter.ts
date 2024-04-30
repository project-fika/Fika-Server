import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";

import { FikaLocationCallbacks } from "../../callbacks/FikaLocationCallbacks";

@injectable()
export class FikaLocationStaticRouter extends StaticRouter {
    constructor(@inject("FikaLocationCallbacks") protected fikaLocationCallbacks: FikaLocationCallbacks) {
        super([
            new RouteAction("/fika/location/raids", (url: string, info: IGetRaidConfigurationRequestData, sessionID: string, _output: string): string => {
                return this.fikaLocationCallbacks.handleGetRaids(url, info, sessionID);
            }),
        ]);
    }
}
