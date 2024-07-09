import { MemberCategory } from "@spt/models/enums/MemberCategory";
export interface ICurrentGroupResponse {
    squad: ICurrentGroupSquadMember[];
}
export interface ICurrentGroupSquadMember {
    _id: string;
    aid: string;
    Info: ICurrentGroupMemberInfo;
    IsLeader: boolean;
    IsReady: boolean;
}
export interface ICurrentGroupMemberInfo {
    Nickname: string;
    Side: string;
    Level: string;
    MemberCategory: MemberCategory;
}
