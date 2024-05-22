import { Message } from "@spt/models/eft/profile/ISptProfile";
export interface IGetAllAttachmentsResponse {
    messages: Message[];
    profiles: any[];
    hasMessagesWithRewards: boolean;
}
