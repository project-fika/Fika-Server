import type { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import type { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchInviteAccept extends IWsNotificationEvent, IGroupCharacter {
}
