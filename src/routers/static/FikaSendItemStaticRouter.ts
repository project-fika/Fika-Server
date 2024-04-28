import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";

import { IFikaSenditemAvailablereceiversRequestData } from "../../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversRequestData";
import { FikaSendItemCallbacks } from "../../callbacks/FikaSendItemCallbacks";

@injectable()
export class FikaSendItemStaticRouter extends StaticRouter {
    constructor(
        @inject("FikaSendItemCallbacks") protected fikaSendItemCallbacks: FikaSendItemCallbacks
    ) {
        super([
            new RouteAction(
                "/fika/senditem/availablereceivers",
                async (url: string, info: IFikaSenditemAvailablereceiversRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaSendItemCallbacks.handleAvailableReceivers(url, info, sessionID);
                }
            )
        ]);
    }
}
