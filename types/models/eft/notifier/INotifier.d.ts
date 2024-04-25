import { Message } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface INotifierChannel {
    server: string;
    channel_id: string;
    url: string;
    notifierServer: string;
    ws: string;
}
export interface INotification {
    type: NotificationType;
    eventId: string;
    dialogId?: string;
    message?: Message;
}
export declare enum NotificationType {
    RAGFAIR_OFFER_SOLD = "RagfairOfferSold",
    RAGFAIR_RATING_CHANGE = "RagfairRatingChange",
    /** ChatMessageReceived */
    NEW_MESSAGE = "new_message",
    PING = "ping",
    TRADER_SUPPLY = "TraderSupply",
    TRADER_STANDING = "TraderStanding",
    UNLOCK_TRADER = "UnlockTrader"
}
