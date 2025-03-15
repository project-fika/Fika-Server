import { SavedCommand } from "@spt/helpers/Dialogue/Commando/SptCommands/GiveCommand/SavedCommand";
import { ISptCommand } from "@spt/helpers/Dialogue/Commando/SptCommands/ISptCommand";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/IUserDialogInfo";
import { IProfileChangeEvent } from "@spt/models/spt/dialog/ISendMessageDetails";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocaleService } from "@spt/services/LocaleService";
import { MailSendService } from "@spt/services/MailSendService";
import { HashUtil } from "@spt/utils/HashUtil";
export declare class ProfileSptCommand implements ISptCommand {
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected hashUtil: HashUtil;
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
    private static examineRegex;
    protected savedCommand: SavedCommand;
    constructor(logger: ILogger, itemHelper: ItemHelper, hashUtil: HashUtil, presetHelper: PresetHelper, mailSendService: MailSendService, localeService: LocaleService, databaseServer: DatabaseServer, profileHelper: ProfileHelper);
    getCommand(): string;
    getCommandHelp(): string;
    performAction(commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
    protected handleSkillCommand(skill: string, level: number): IProfileChangeEvent;
    protected handleLevelCommand(level: number): IProfileChangeEvent;
    protected handleExamineCommand(): IProfileChangeEvent;
}
