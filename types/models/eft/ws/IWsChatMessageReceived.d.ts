import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { Message } from "@spt/models/eft/profile/ISptProfile";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsChatMessageReceived extends IWsNotificationEvent {
    dialogId: string;
    message: Message;
    profiles?: IGroupCharacter[];
}
