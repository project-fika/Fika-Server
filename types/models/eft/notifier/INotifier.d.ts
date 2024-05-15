import { Message } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface INotifierChannel {
    server: string;
    channel_id: string;
    url: string;
    notifierServer: string;
    ws: string;
}
export interface INotification {
    type: NotificationType;
    eventId: string;
    dialogId?: string;
    message?: Message;
}
export declare enum NotificationType {
    RAGFAIR_OFFER_SOLD = "RagfairOfferSold",
    RAGFAIR_RATING_CHANGE = "RagfairRatingChange",
    /** ChatMessageReceived */
    NEW_MESSAGE = "new_message",
    PING = "ping",
    TRADER_SUPPLY = "TraderSupply",
    TRADER_STANDING = "TraderStanding",
    UNLOCK_TRADER = "UnlockTrader",
    GROUP_MATCH_RAID_SETTINGS = "groupMatchRaidSettings",
    GROUP_MATCH_RAID_NOT_READY = "groupMatchRaidNotReady",
    GROUP_MATCH_RAID_READY = "groupMatchRaidReady",
    GROUP_MATCH_INVITE_ACCEPT = "groupMatchInviteAccept",
    GROUP_MATCH_INVITE_DECLINE = "groupMatchInviteDecline",
    GROUP_MATCH_INVITE_SEND = "groupMatchInviteSend",
    GROUP_MATCH_LEADER_CHANGED = "groupMatchLeaderChanged",
    GROUP_MATCH_START_GAME = "groupMatchStartGame",
    GROUP_MATCH_USER_LEAVE = "groupMatchUserLeave",
    GROUP_MATCH_WAS_REMOVED = "groupMatchWasRemoved",
    GROUP_MATCH_USER_BAD_VERSION = "groupMatchUserHasBadVersion",
    USER_CONFIRMED = "userConfirmed",
    CHANNEL_DELETED = "channel_deleted",
    FRIEND_LIST_REQUEST_ACCEPTED = "friendListRequestAccept",
    FRIEND_LIST_REQUEST_DECLINED = "friendListRequestDecline",
    FRIEND_LIST_NEW_REQUEST = "friendListNewRequest",
    FRIEND_LIST_REMOVED_FROM_FRIEND_LIST = "youAreRemovedFromFriendList",
    YOU_ARE_ADDED_TO_IGNORE_LIST = "YouWereAddedToIgnoreList",
    YOU_ARE_REMOVED_FROM_IGNORE_LIST = "youAreRemoveFromIgnoreList"
}
