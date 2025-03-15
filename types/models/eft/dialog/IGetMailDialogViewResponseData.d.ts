import { IMessage } from "@spt/models/eft/profile/ISptProfile";
import { IUserDialogInfo } from "../profile/IUserDialogInfo";
export interface IGetMailDialogViewResponseData {
    messages: IMessage[];
    profiles: IUserDialogInfo[];
    hasMessagesWithRewards: boolean;
}
