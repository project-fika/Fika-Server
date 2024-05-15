import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsAidNickname extends IWsNotificationEvent {
    aid: number;
    Nickname: string;
}
