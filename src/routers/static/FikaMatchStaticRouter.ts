import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";

import { FikaMatchCallbacks } from "../../callbacks/FikaMatchCallbacks";

@injectable()
export class FikaMatchStaticRouter extends StaticRouter {
    constructor(@inject("FikaMatchCallbacks") protected fikaMatchCallbacks: FikaMatchCallbacks) {
        super([
            new RouteAction("/client/match/group/raid/not-ready", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaMatchCallbacks.handleMatchGroupRaidNotReady(url, info, sessionID);
            }),
            new RouteAction("/client/match/group/raid/ready", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaMatchCallbacks.handleMatchGroupRaidReady(url, info, sessionID);
            }),
        ]);
    }
}
