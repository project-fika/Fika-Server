import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { IPushNotification } from "../models/fika/websocket/notifications/IPushNotification";
import { FikaNotificationWebSocket } from "../websockets/FikaNotificationWebSocket";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { EFikaNotifications } from "../models/enums/EFikaNotifications";
import { EEFTNotificationIconType } from "../models/enums/EEFTNotificationIconType";

@injectable()
export class FikaNotificationCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaNotificationWebSocket") protected fikaNotificationWebSocket: FikaNotificationWebSocket,
    ) {
        // empty
    }

    /** Handle /fika/notification/push */
    public handlePushNotification(_url: string, info: IPushNotification, _sessionID: string): INullResponseData {
        // Yes, technically this needs a controller to fit into this format. But I cant be bothered setting up a whole controller for a few checks.
        if (!info.notification) {
            return this.httpResponseUtil.nullResponse();
        }

        info.type = EFikaNotifications.PushNotification;

        // Set default notification icon if data for this has not been correctly given.
        if (!info.notificationIcon || typeof info.notificationIcon != "number") {
            info.notificationIcon = EEFTNotificationIconType.Default;
        }

        //Do some exception handling for the client, icon 6 seems to cause an exception as well as going out of the enum's bounds.
        if (info.notificationIcon == 6 || info.notificationIcon > 14) {
            info.notificationIcon = EEFTNotificationIconType.Default;
        }

        this.fikaNotificationWebSocket.broadcast(info);

        return this.httpResponseUtil.nullResponse();
    }
}
