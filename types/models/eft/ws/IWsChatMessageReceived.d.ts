import { Message } from "@spt/models/eft/profile/ISptProfile";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
import { IGroupCharacter } from "../match/IGroupCharacter";
export interface IWsChatMessageReceived extends IWsNotificationEvent {
    dialogId: string;
    message: Message;
    profiles?: IGroupCharacter[];
}
