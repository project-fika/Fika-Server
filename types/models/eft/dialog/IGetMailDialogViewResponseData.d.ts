import { IMessage, IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
export interface IGetMailDialogViewResponseData {
    messages: IMessage[];
    profiles: IUserDialogInfo[];
    hasMessagesWithRewards: boolean;
}
