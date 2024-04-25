import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { NotificationSendHelper } from "@spt-aki/helpers/NotificationSendHelper";
import { NotifierHelper } from "@spt-aki/helpers/NotifierHelper";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { Dialogue, MessagePreview } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
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
    getMessagePreview(dialogue: Dialogue): MessagePreview;
    /**
     * Get the item contents for a particular message.
     * @param messageID
     * @param sessionID
     * @param itemId Item being moved to inventory
     * @returns
     */
    getMessageItemContents(messageID: string, sessionID: string, itemId: string): Item[];
    /**
     * Get the dialogs dictionary for a profile, create if doesnt exist
     * @param sessionId Session/player id
     * @returns Dialog dictionary
     */
    getDialogsForProfile(sessionId: string): Record<string, Dialogue>;
}
