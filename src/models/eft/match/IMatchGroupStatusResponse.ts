import { IGroupCharacter } from "./IGroupCharacter";

export interface IMatchGroupStatusResponse {
    players: IGroupCharacter[];
    maxPveCountExceeded: boolean;
}
