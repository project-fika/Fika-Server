export interface IAcceptGroupInviteResponse {
    _id: string;
    aid: number;
    Info: PlayerInviteInfo;
    isLeader: boolean;
    isReady: boolean;
}
export interface PlayerInviteInfo {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: number;
    GameVersion: string;
    SavageLockTime: number;
    SavageNickname: string;
}
