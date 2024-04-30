import { IChatCommand, ICommandoCommand } from "@spt-aki/helpers/Dialogue/Commando/IChatCommand";
import { IDialogueChatBot } from "@spt-aki/helpers/Dialogue/IDialogueChatBot";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { MailSendService } from "@spt-aki/services/MailSendService";
export declare abstract class AbstractDialogueChatBot implements IDialogueChatBot {
    protected logger: ILogger;
    protected mailSendService: MailSendService;
    protected chatCommands: IChatCommand[] | ICommandoCommand[];
    constructor(logger: ILogger, mailSendService: MailSendService, chatCommands: IChatCommand[] | ICommandoCommand[]);
    /**
     * @deprecated As of v3.7.6. Use registerChatCommand.
     */
    registerCommandoCommand(chatCommand: IChatCommand | ICommandoCommand): void;
    registerChatCommand(chatCommand: IChatCommand | ICommandoCommand): void;
    abstract getChatBot(): IUserDialogInfo;
    protected abstract getUnrecognizedCommandMessage(): string;
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
