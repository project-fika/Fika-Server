import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";

export interface IGroupCharacter {
    _id: string;
    aid: number;
    Info: {
        Nickname: string;
        Side: string;
        Level: number;
        MemberCategory: MemberCategory;
    }
    PlayerVisualRepresentation: {
        Info: {
            Side: string,
            Level: number,
            Nickname: string,
            MemberCategory: MemberCategory;
        },
        Equipment: any,
        Customization: any
    }
    isLeader: boolean;
    region: string,
    lookingGroup: boolean
}
