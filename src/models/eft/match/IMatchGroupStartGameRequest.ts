import { IServer } from "./IServer";

export interface IMatchGroupStartGameRequest {
    groupId: string;
    servers: IServer[];
}
