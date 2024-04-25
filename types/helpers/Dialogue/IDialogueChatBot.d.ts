import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IDialogueChatBot {
    getChatBot(): IUserDialogInfo;
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
