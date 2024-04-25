import { INotification } from "@spt-aki/models/eft/notifier/INotifier";
import { Dialogue, IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { MessageType } from "@spt-aki/models/enums/MessageType";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { WebSocketServer } from "@spt-aki/servers/WebSocketServer";
import { NotificationService } from "@spt-aki/services/NotificationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
export declare class NotificationSendHelper {
    protected webSocketServer: WebSocketServer;
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected notificationService: NotificationService;
    constructor(webSocketServer: WebSocketServer, hashUtil: HashUtil, saveServer: SaveServer, notificationService: NotificationService);
    /**
     * Send notification message to the appropriate channel
     * @param sessionID
     * @param notificationMessage
     */
    sendMessage(sessionID: string, notificationMessage: INotification): void;
    /**
     * Send a message directly to the player
     * @param sessionId Session id
     * @param senderDetails Who is sendin the message to player
     * @param messageText Text to send player
     * @param messageType Underlying type of message being sent
     */
    sendMessageToPlayer(sessionId: string, senderDetails: IUserDialogInfo, messageText: string, messageType: MessageType): void;
    /**
     * Helper function for sendMessageToPlayer(), get new dialog for storage in profile or find existing by sender id
     * @param sessionId Session id
     * @param messageType Type of message to generate
     * @param senderDetails Who is sending the message
     * @returns Dialogue
     */
    protected getDialog(sessionId: string, messageType: MessageType, senderDetails: IUserDialogInfo): Dialogue;
}
