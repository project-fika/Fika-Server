import { IUserDialogInfo, Message } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IGetMailDialogViewResponseData {
    messages: Message[];
    profiles: IUserDialogInfo[];
    hasMessagesWithRewards: boolean;
}
