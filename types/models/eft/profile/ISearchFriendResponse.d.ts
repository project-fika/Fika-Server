export interface ISearchFriendResponse {
    _id: string;
    aid: number;
    Info: Info;
}
export interface Info {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: number;
}
