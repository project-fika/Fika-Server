import { ItemHelper } from "@spt/helpers/ItemHelper";
import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { NotifierHelper } from "@spt/helpers/NotifierHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IDialogue, IMessagePreview } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
export declare class DialogueHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected notifierHelper: NotifierHelper;
    protected notificationSendHelper: NotificationSendHelper;
    protected localisationService: LocalisationService;
    protected itemHelper: ItemHelper;
    constructor(logger: ILogger, hashUtil: HashUtil, saveServer: SaveServer, databaseServer: DatabaseServer, notifierHelper: NotifierHelper, notificationSendHelper: NotificationSendHelper, localisationService: LocalisationService, itemHelper: ItemHelper);
    /**
     * Get the preview contents of the last message in a dialogue.
     * @param dialogue
     * @returns MessagePreview
     */
    getMessagePreview(dialogue: IDialogue): IMessagePreview;
    /**
     * Get the item contents for a particular message.
     * @param messageID
     * @param sessionID
     * @param itemId Item being moved to inventory
     * @returns
     */
    getMessageItemContents(messageID: string, sessionID: string, itemId: string): IItem[];
    /**
     * Get the dialogs dictionary for a profile, create if doesnt exist
     * @param sessionId Session/player id
     * @returns Dialog dictionary
     */
    getDialogsForProfile(sessionId: string): Record<string, IDialogue>;
}
