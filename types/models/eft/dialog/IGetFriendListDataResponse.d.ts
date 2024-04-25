import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IGetFriendListDataResponse {
    Friends: IUserDialogInfo[];
    Ignore: string[];
    InIgnoreList: string[];
}
