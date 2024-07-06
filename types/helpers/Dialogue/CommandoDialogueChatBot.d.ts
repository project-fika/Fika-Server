import { AbstractDialogueChatBot } from "@spt/helpers/Dialogue/AbstractDialogueChatBot";
import { IChatCommand } from "@spt/helpers/Dialogue/Commando/IChatCommand";
import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { MailSendService } from "@spt/services/MailSendService";
export declare class CommandoDialogueChatBot extends AbstractDialogueChatBot {
    constructor(logger: ILogger, mailSendService: MailSendService, chatCommands: IChatCommand[]);
    getChatBot(): IUserDialogInfo;
    protected getUnrecognizedCommandMessage(): string;
}
