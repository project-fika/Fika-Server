import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsRagfairOfferSold extends IWsNotificationEvent {
    offerId: string;
    count: number;
    handbookId: string;
}
