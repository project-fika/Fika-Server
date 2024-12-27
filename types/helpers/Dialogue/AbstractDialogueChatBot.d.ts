import type { IChatCommand } from "@spt/helpers/Dialogue/Commando/IChatCommand";
import type { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import type { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import type { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
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
