import { MessageType } from "@spt-aki/models/enums/MessageType";
export interface IGetMailDialogViewRequestData {
    type: MessageType;
    dialogId: string;
    limit: number;
    time: number;
}
