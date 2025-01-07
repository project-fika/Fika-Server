import { IChatCommand } from "@spt/helpers/Dialogue/Commando/IChatCommand";
import { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/IUserDialogInfo";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { MailSendService } from "@spt/services/MailSendService";
export declare abstract class AbstractDialogueChatBot implements IDialogueChatBot {
    protected logger: ILogger;
    protected mailSendService: MailSendService;
    protected chatCommands: IChatCommand[];
    constructor(logger: ILogger, mailSendService: MailSendService, chatCommands: IChatCommand[]);
    registerChatCommand(chatCommand: IChatCommand): void;
    abstract getChatBot(): IUserDialogInfo;
    protected abstract getUnrecognizedCommandMessage(): string;
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
