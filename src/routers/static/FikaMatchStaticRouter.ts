import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { FikaMatchCallbacks } from "../../callbacks/FikaMatchCallbacks";

@injectable()
export class FikaMatchStaticRouter extends StaticRouter {
    constructor(@inject("FikaMatchCallbacks") protected fikaMatchCallbacks: FikaMatchCallbacks) {
        super([
            new RouteAction("/client/match/raid/not-ready", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaMatchCallbacks.handleMatchGroupRaidNotReady(url, info, sessionID);
            }),
            new RouteAction("/client/match/raid/ready", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaMatchCallbacks.handleMatchGroupRaidReady(url, info, sessionID);
            }),
        ]);
    }
}
