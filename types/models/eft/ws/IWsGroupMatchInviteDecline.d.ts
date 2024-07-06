import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchInviteDecline extends IWsNotificationEvent {
    aid: number;
    Nickname: string;
}
