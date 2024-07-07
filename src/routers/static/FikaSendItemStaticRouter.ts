import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { FikaSendItemCallbacks } from "../../callbacks/FikaSendItemCallbacks";
import { IFikaSenditemAvailablereceiversRequestData } from "../../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversRequestData";

@injectable()
export class FikaSendItemStaticRouter extends StaticRouter {
    constructor(@inject("FikaSendItemCallbacks") protected fikaSendItemCallbacks: FikaSendItemCallbacks) {
        super([
            new RouteAction("/fika/senditem/availablereceivers", async (url: string, info: IFikaSenditemAvailablereceiversRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaSendItemCallbacks.handleAvailableReceivers(url, info, sessionID);
            }),
        ]);
    }
}
