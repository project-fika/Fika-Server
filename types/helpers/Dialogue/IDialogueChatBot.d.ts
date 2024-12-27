import type { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import type { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
export interface IDialogueChatBot {
    getChatBot(): IUserDialogInfo;
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
