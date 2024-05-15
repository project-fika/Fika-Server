import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchLeaderChanged extends IWsNotificationEvent {
    owner: number;
}
