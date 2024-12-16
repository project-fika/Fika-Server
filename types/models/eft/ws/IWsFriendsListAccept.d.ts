import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
import { ISearchFriendResponse } from "../profile/ISearchFriendResponse";
export interface IWsFriendsListAccept extends IWsNotificationEvent {
    profile: ISearchFriendResponse;
}
