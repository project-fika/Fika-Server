import { IChatCommand, ICommandoCommand } from "@spt/helpers/Dialogue/Commando/IChatCommand";
import { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { MailSendService } from "@spt/services/MailSendService";
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
