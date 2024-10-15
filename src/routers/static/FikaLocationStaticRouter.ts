import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { FikaLocationCallbacks } from "../../callbacks/FikaLocationCallbacks";

@injectable()
export class FikaLocationStaticRouter extends StaticRouter {
    constructor(@inject("FikaLocationCallbacks") protected fikaLocationCallbacks: FikaLocationCallbacks) {
        super([
            new RouteAction("/fika/location/raids", async (url: string, info: IGetRaidConfigurationRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaLocationCallbacks.handleGetRaids(url, info, sessionID);
            }),
        ]);
    }
}
