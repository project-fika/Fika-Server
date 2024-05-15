import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { Message, MessageContentRagfair } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IWsChatMessageReceived } from "@spt-aki/models/eft/ws/IWsChatMessageReceived";
import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
import { IWsRagfairOfferSold } from "@spt-aki/models/eft/ws/IWsRagfairOfferSold";
export declare class NotifierHelper {
    protected httpServerHelper: HttpServerHelper;
    /**
     * The default notification sent when waiting times out.
     */
    protected defaultNotification: IWsNotificationEvent;
    constructor(httpServerHelper: HttpServerHelper);
    getDefaultNotification(): IWsNotificationEvent;
    /**
     * Create a new notification that displays the "Your offer was sold!" prompt and removes sold offer from "My Offers" on clientside
     * @param dialogueMessage Message from dialog that was sent
     * @param ragfairData Ragfair data to attach to notification
     * @returns
     */
    createRagfairOfferSoldNotification(dialogueMessage: Message, ragfairData: MessageContentRagfair): IWsRagfairOfferSold;
    /**
     * Create a new notification with the specified dialogueMessage object
     * @param dialogueMessage
     * @returns
     */
    createNewMessageNotification(dialogueMessage: Message): IWsChatMessageReceived;
    getWebSocketServer(sessionID: string): string;
}
