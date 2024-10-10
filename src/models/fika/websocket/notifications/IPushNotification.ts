import { IFikaNotificationBase } from "../IFikaNotificationBase";
import { EFTNotificationIconType } from "../../../enums/EFTNotificationIconType";

export interface IPushNotification extends IFikaNotificationBase {
    notificationIcon : EFTNotificationIconType;
    notification: string;
}
