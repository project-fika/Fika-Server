import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchLeaderChanged extends IWsNotificationEvent {
    owner: number;
}
