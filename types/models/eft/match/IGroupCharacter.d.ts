import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";
export interface IGroupCharacter {
    _id: string;
    aid: number;
    Info: {
        Nickname: string;
        Side: string;
        Level: number;
        MemberCategory: MemberCategory;
        GameVersion?: string;
        SavageLockTime?: number;
        SavageNickname?: string;
        hasCoopExtension?: boolean;
    };
    PlayerVisualRepresentation?: {
        Info: {
            Side: string;
            Level: number;
            Nickname: string;
            MemberCategory: MemberCategory;
            GameVersion: string;
        };
        Customization: {
            Head: string;
            Body: string;
            Feet: string;
            Hands: string;
        };
        Equipment: {
            Id: string;
            Items: Item[];
        };
    };
    isLeader: boolean;
    isReady?: boolean;
    region?: string;
    lookingGroup?: boolean;
}
