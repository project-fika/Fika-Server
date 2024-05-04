import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";

export interface IFriendRequestListResponse {
    _id: string;
    from: string;
    to: string;
    date: number;
    profile: {
        _id: string;
        aid: number;
        Info: {
            Nickname: string;
            Side: string;
            Level: number;
            MemberCategory: MemberCategory;
        };
    };
}
