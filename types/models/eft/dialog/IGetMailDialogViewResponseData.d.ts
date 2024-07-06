import { IUserDialogInfo, Message } from "@spt/models/eft/profile/ISptProfile";
export interface IGetMailDialogViewResponseData {
    messages: Message[];
    profiles: IUserDialogInfo[];
    hasMessagesWithRewards: boolean;
}
