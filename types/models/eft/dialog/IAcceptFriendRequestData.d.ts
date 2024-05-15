export interface IAcceptFriendRequestData extends IBaseFriendRequest {
}
export interface ICancelFriendRequestData extends IBaseFriendRequest {
}
export interface IDeclineFriendRequestData extends IBaseFriendRequest {
}
export interface IBaseFriendRequest {
    profileId: string;
}
