import { MessageType } from "@spt-aki/models/enums/MessageType";
export interface ISendMessageRequest {
    dialogId: string;
    type: MessageType;
    text: string;
    replyTo: string;
}
