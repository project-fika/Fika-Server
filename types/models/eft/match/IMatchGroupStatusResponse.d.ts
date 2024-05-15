import { IGroupCharacter } from "@spt-aki/models/eft/match/IGroupCharacter";
export interface IMatchGroupStatusResponse {
    players: IGroupCharacter[];
    maxPveCountExceeded: boolean;
}
