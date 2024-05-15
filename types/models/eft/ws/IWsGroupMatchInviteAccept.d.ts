import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
import { IGroupCharacter } from "../match/IGroupCharacter";
export interface IWsGroupMatchInviteAccept extends IWsNotificationEvent, IGroupCharacter {
}
