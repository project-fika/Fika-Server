import { IGroupCharacter } from "./IGroupCharacter";

export interface IWsMatchGroupInviteSend {
    type: string;
    eventId: string;
    requestId: string;
    from: number;
    members: IGroupCharacter[];
}
