import { MemberCategory } from "@spt/models/enums/MemberCategory";

export interface IWsProfile {
    type: string;
    eventId: string;
    _id?: string;
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
