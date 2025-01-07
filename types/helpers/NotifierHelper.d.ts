import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { IMessageContentRagfair } from "@spt/models/eft/profile/IMessageContentRagfair";
import { IMessage } from "@spt/models/eft/profile/ISptProfile";
import { IWsChatMessageReceived } from "@spt/models/eft/ws/IWsChatMessageReceived";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
import { IWsRagfairOfferSold } from "@spt/models/eft/ws/IWsRagfairOfferSold";
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
    createRagfairOfferSoldNotification(dialogueMessage: IMessage, ragfairData: IMessageContentRagfair): IWsRagfairOfferSold;
    /**
     * Create a new notification with the specified dialogueMessage object
     * @param dialogueMessage
     * @returns
     */
    createNewMessageNotification(dialogueMessage: IMessage): IWsChatMessageReceived;
    getWebSocketServer(sessionID: string): string;
}
