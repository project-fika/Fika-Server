import { EEFTNotificationIconType } from "../../../enums/EEFTNotificationIconType";
import { IFikaNotificationBase } from "../IFikaNotificationBase";

export interface IPushNotification extends IFikaNotificationBase {
    notificationIcon: EEFTNotificationIconType;
    notification: string;
}
