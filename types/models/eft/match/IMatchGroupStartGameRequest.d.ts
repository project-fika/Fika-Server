import { IServer } from "@spt/models/eft/match/IServer";
export interface IMatchGroupStartGameRequest {
    groupId: string;
    servers: IServer[];
}
