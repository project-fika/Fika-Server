import { IFikaNotificationBase } from "../IFikaNotificationBase";
import { EEFTNotificationIconType } from "../../../enums/EEFTNotificationIconType";

export interface IPushNotification extends IFikaNotificationBase {
    notificationIcon : EEFTNotificationIconType;
    notification: string;
}
