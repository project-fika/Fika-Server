import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";
export interface IGetGroupStatusResponse {
    players: IPlayer[];
    maxPveCountExceeded: boolean;
}
export interface IPlayer {
    aid: string;
    _id: string;
    lookingGroup: boolean;
    IsLeader: boolean;
    IsReady: boolean;
    Info: ICurrentGroupMemberInfo;
}
export interface ICurrentGroupMemberInfo {
    Nickname: string;
    Side: string;
    Level: string;
    MemberCategory: MemberCategory;
}
