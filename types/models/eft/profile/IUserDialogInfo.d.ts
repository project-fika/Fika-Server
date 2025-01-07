import { MemberCategory } from "@spt/models/enums/MemberCategory";
export interface IUserDialogInfo {
    _id: string;
    aid: number;
    Info?: IUserDialogDetails;
}
export interface IUserDialogDetails {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
    SelectedMemberCategory: MemberCategory;
}
