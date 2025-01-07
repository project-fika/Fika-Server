import { IUserDialogInfo } from "../profile/IUserDialogInfo";
export interface IGetFriendListDataResponse {
    Friends: IUserDialogInfo[];
    Ignore: string[];
    InIgnoreList: string[];
}
