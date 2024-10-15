import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { FikaNotificationCallbacks } from "../../callbacks/FikaNotificationCallbacks";
import { IPushNotification } from "../../models/fika/websocket/notifications/IPushNotification";

@injectable()
export class FikaNotificationStaticRouter extends StaticRouter {
    constructor(@inject("FikaNotificationCallbacks") protected fikaNotificationCallbacks: FikaNotificationCallbacks) {
        super([
            new RouteAction("/fika/notification/push", async (url: string, info: IPushNotification, sessionID: string, _output: string): Promise<any> => {
                return this.fikaNotificationCallbacks.handlePushNotification(url, info, sessionID);
            }),
        ]);
    }
}
