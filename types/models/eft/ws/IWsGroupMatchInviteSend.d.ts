import { IGroupCharacter } from "@spt-aki/models/eft/match/IGroupCharacter";
import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchInviteSend extends IWsNotificationEvent {
    requestId: string;
    from: number;
    members: IGroupCharacter[];
}
