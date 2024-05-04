import { IFriendRequestListResponse } from "../eft/dialog/IFriendRequestListResponse";

export interface IFikaFriendRequests extends Omit<IFriendRequestListResponse, "profile"> {}
