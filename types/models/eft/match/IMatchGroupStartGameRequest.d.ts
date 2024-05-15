import { IServer } from "@spt-aki/models/eft/match/IServer";
export interface IMatchGroupStartGameRequest {
    groupId: string;
    servers: IServer[];
}
