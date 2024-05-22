import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
export interface IGetFriendListDataResponse {
    Friends: IUserDialogInfo[];
    Ignore: string[];
    InIgnoreList: string[];
}
