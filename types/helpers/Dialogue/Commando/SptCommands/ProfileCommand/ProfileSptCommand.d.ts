import { SavedCommand } from "@spt-aki/helpers/Dialogue/Commando/SptCommands/GiveCommand/SavedCommand";
import { ISptCommand } from "@spt-aki/helpers/Dialogue/Commando/SptCommands/ISptCommand";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IProfileChangeEvent } from "@spt-aki/models/spt/dialog/ISendMessageDetails";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocaleService } from "@spt-aki/services/LocaleService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class ProfileSptCommand implements ISptCommand {
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected presetHelper: PresetHelper;
    protected mailSendService: MailSendService;
    protected localeService: LocaleService;
    protected databaseServer: DatabaseServer;
    protected profileHelper: ProfileHelper;
    /**
     * Regex to account for all these cases:
     * spt profile level 20
     * spt profile skill metabolism 10
     */
    private static commandRegex;
    protected savedCommand: SavedCommand;
    constructor(logger: ILogger, itemHelper: ItemHelper, hashUtil: HashUtil, jsonUtil: JsonUtil, presetHelper: PresetHelper, mailSendService: MailSendService, localeService: LocaleService, databaseServer: DatabaseServer, profileHelper: ProfileHelper);
    getCommand(): string;
    getCommandHelp(): string;
    performAction(commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
    protected handleSkillCommand(skill: string, level: number): IProfileChangeEvent;
    protected handleLevelCommand(level: number): IProfileChangeEvent;
}
