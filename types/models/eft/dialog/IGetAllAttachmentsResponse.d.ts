import { Message } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IGetAllAttachmentsResponse {
    messages: Message[];
    profiles: any[];
    hasMessagesWithRewards: boolean;
}
