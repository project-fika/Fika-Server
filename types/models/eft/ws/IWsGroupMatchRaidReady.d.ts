import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchRaidReady extends IWsNotificationEvent {
    extendedProfile: IGroupCharacter;
}
