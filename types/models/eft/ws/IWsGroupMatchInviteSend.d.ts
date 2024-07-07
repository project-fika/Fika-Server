import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchInviteSend extends IWsNotificationEvent {
    requestId: string;
    from: number;
    members: IGroupCharacter[];
}
