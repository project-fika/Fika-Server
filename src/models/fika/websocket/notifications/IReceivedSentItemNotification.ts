import { IFikaNotificationBase } from "../IFikaNotificationBase";

export interface IReceivedSentItemNotification extends IFikaNotificationBase {
    nickname: string;
    targetId: string;
    itemName: string;
}
