import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMessage } from "@spt/models/eft/profile/ISptProfile";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsChatMessageReceived extends IWsNotificationEvent {
    dialogId: string;
    message: IMessage;
    profiles?: IGroupCharacter[];
}
