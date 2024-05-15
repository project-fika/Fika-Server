import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";

export interface IGroupMember {
    _id: string;
    aid: number;
    Info: {
        Nickname: string;
        Side: string;
        Level: number;
        MemberCategory: MemberCategory;
        GameVersion: string;
        SavageLockTime: number;
        SavageNickname: string;
        hasCoopExtension: boolean;
    }
    isLeader: boolean;
    isReady: boolean;
}
