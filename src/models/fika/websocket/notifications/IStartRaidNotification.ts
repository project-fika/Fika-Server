import { IFikaNotificationBase } from "../IFikaNotificationBase";

export interface IStartRaidNotification extends IFikaNotificationBase {
    nickname: string;
    location: string;
}
