import { IMessage } from "@spt/models/eft/profile/ISptProfile";
export interface IGetAllAttachmentsResponse {
    messages: IMessage[];
    profiles: any[];
    hasMessagesWithRewards: boolean;
}
