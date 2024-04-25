import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { INotification } from "@spt-aki/models/eft/notifier/INotifier";
import { Message, MessageContentRagfair } from "@spt-aki/models/eft/profile/IAkiProfile";
export declare class NotifierHelper {
    protected httpServerHelper: HttpServerHelper;
    /**
     * The default notification sent when waiting times out.
     */
    protected defaultNotification: INotification;
    constructor(httpServerHelper: HttpServerHelper);
    getDefaultNotification(): INotification;
    /**
     * Create a new notification that displays the "Your offer was sold!" prompt and removes sold offer from "My Offers" on clientside
     * @param dialogueMessage Message from dialog that was sent
     * @param ragfairData Ragfair data to attach to notification
     * @returns
     */
    createRagfairOfferSoldNotification(dialogueMessage: Message, ragfairData: MessageContentRagfair): INotification;
    /**
     * Create a new notification with the specified dialogueMessage object
     * @param dialogueMessage
     * @returns
     */
    createNewMessageNotification(dialogueMessage: Message): INotification;
    getWebSocketServer(sessionID: string): string;
}
