import { AbstractDialogueChatBot } from "@spt-aki/helpers/Dialogue/AbstractDialogueChatBot";
import { IChatCommand } from "@spt-aki/helpers/Dialogue/Commando/IChatCommand";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { MailSendService } from "@spt-aki/services/MailSendService";
export declare class CommandoDialogueChatBot extends AbstractDialogueChatBot {
    constructor(logger: ILogger, mailSendService: MailSendService, chatCommands: IChatCommand[]);
    getChatBot(): IUserDialogInfo;
    protected getUnrecognizedCommandMessage(): string;
}
