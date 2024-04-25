import { ICommandoCommand } from "@spt-aki/helpers/Dialogue/Commando/ICommandoCommand";
import { IDialogueChatBot } from "@spt-aki/helpers/Dialogue/IDialogueChatBot";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { MailSendService } from "@spt-aki/services/MailSendService";
export declare class CommandoDialogueChatBot implements IDialogueChatBot {
    protected logger: ILogger;
    protected mailSendService: MailSendService;
    protected commandoCommands: ICommandoCommand[];
    constructor(logger: ILogger, mailSendService: MailSendService, commandoCommands: ICommandoCommand[]);
    registerCommandoCommand(commandoCommand: ICommandoCommand): void;
    getChatBot(): IUserDialogInfo;
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
