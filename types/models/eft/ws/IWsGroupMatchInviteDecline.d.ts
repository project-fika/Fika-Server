import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchInviteDecline extends IWsNotificationEvent {
    aid: number;
    Nickname: string;
}
