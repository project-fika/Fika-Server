import { IGroupCharacter } from "./IGroupCharacter";

export interface IWsMatchGroupRaidReady {
    type: string;
    eventId: string;
    extendedProfile: IGroupCharacter;
}
