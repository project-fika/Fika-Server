import { SavedCommand } from "@spt-aki/helpers/Dialogue/Commando/SptCommands/GiveCommand/SavedCommand";
import { ISptCommand } from "@spt-aki/helpers/Dialogue/Commando/SptCommands/ISptCommand";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { LocaleService } from "@spt-aki/services/LocaleService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class GiveSptCommand implements ISptCommand {
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected presetHelper: PresetHelper;
    protected mailSendService: MailSendService;
    protected localeService: LocaleService;
    protected databaseServer: DatabaseServer;
    protected itemFilterService: ItemFilterService;
    /**
     * Regex to account for all these cases:
     * spt give "item name" 5
     * spt give templateId 5
     * spt give en "item name in english" 5
     * spt give es "nombre en español" 5
     * spt give 5 <== this is the reply when the algo isn't sure about an item
     */
    private static commandRegex;
    private static acceptableConfidence;
    protected savedCommand: Map<string, SavedCommand>;
    constructor(logger: ILogger, itemHelper: ItemHelper, hashUtil: HashUtil, jsonUtil: JsonUtil, presetHelper: PresetHelper, mailSendService: MailSendService, localeService: LocaleService, databaseServer: DatabaseServer, itemFilterService: ItemFilterService);
    getCommand(): string;
    getCommandHelp(): string;
    performAction(commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
    /**
     * A "simple" function that checks if an item is supposed to be given to a player or not
     * @param templateItem the template item to check
     * @returns true if its obtainable, false if its not
     */
    protected isItemAllowed(templateItem: ITemplateItem): boolean;
}
