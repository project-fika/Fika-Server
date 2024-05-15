import { Message } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
import { IGroupCharacter } from "../match/IGroupCharacter";
export interface IWsChatMessageReceived extends IWsNotificationEvent {
    dialogId: string;
    message: Message;
    profiles?: IGroupCharacter[];
}
