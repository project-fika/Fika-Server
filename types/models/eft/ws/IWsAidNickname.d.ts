import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsAidNickname extends IWsNotificationEvent {
    aid: number;
    Nickname: string;
}
