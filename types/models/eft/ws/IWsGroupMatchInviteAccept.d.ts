import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
import { IGroupCharacter } from "../match/IGroupCharacter";
export interface IWsGroupMatchInviteAccept extends IWsNotificationEvent, IGroupCharacter {
}
