import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
export interface IMatchGroupStatusResponse {
    players: IGroupCharacter[];
    maxPveCountExceeded: boolean;
}
