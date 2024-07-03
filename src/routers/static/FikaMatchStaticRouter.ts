import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";
import { MatchCallbacks } from "@spt/callbacks/MatchCallbacks";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";

@injectable()
export class FikaMatchStaticRouter extends StaticRouter {
    constructor(@inject("MatchCallbacks") protected matchCallbacks: MatchCallbacks) {
        super([

            new RouteAction(
                "/client/match/raid/ready",
                async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string,
                ): Promise<IGetBodyResponseData<boolean>> =>
                {
                    return this.matchCallbacks.raidReady(url, info, sessionID);
                },
            ),
            new RouteAction(
                "/client/match/raid/not-ready",
                async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string,
                ): Promise<IGetBodyResponseData<boolean>> =>
                {
                    return this.matchCallbacks.notRaidReady(url, info, sessionID);
                },
            ),
        ])
    }
}
