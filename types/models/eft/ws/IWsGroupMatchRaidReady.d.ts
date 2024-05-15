import { IGroupCharacter } from "@spt-aki/models/eft/match/IGroupCharacter";
import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchRaidReady extends IWsNotificationEvent {
    extendedProfile: IGroupCharacter;
}
