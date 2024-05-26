import { inject, injectAll, injectable } from "tsyringe";

import { IDialogueChatBot } from "@spt-aki/helpers/Dialogue/IDialogueChatBot";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IFriendRequestSendResponse } from "@spt-aki/models/eft/dialog/IFriendRequestSendResponse";
import { IGetFriendListDataResponse } from "@spt-aki/models/eft/dialog/IGetFriendListDataResponse";
import { BackendErrorCodes } from "@spt-aki/models/enums/BackendErrorCodes";

import { FikaFriendRequestsHelper } from "../helpers/FikaFriendRequestsHelper";
import { FikaPlayerRelationsHelper } from "../helpers/FikaPlayerRelationsHelper";
import { IFriendRequestListResponse } from "../models/eft/dialog/IFriendRequestListResponse";
import { WebSocketServer } from "@spt-aki/servers/WebSocketServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

@injectable()
export class FikaDialogueController {
    constructor(
        @injectAll("DialogueChatBot") protected dialogueChatBots: IDialogueChatBot[],
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("FikaFriendRequestsHelper") protected fikaFriendRequestsHelper: FikaFriendRequestsHelper,
        @inject("FikaPlayerRelationsHelper") protected fikaPlayerRelationsHelper: FikaPlayerRelationsHelper,
        @inject("WebSocketServer") protected webSocketServer: WebSocketServer,
        @inject("WinstonLogger") protected logger: ILogger
    ) {
        // empty
    }

    public getFriendList(sessionID: string): IGetFriendListDataResponse {
        const botsAndFriends = this.dialogueChatBots.map((v) => v.getChatBot());

        const friendsIds = this.fikaPlayerRelationsHelper.getFriendsList(sessionID);

        for (const friendId of friendsIds) {
            const profile = this.profileHelper.getPmcProfile(friendId);

            botsAndFriends.push({
                _id: profile._id,
                aid: profile.aid,
                Info: {
                    Nickname: profile.Info.Nickname,
                    Level: profile.Info.Level,
                    Side: profile.Info.Side,
                    MemberCategory: profile.Info.MemberCategory,
                },
            });
        }

        return {
            Friends: botsAndFriends,
            Ignore: this.fikaPlayerRelationsHelper.getIgnoreList(sessionID),
            InIgnoreList: this.fikaPlayerRelationsHelper.getInIgnoreList(sessionID),
        };
    }

    public listOutbox(sessionID: string): IFriendRequestListResponse[] {
        const sentFriendRequests = this.fikaFriendRequestsHelper.getSentFriendRequests(sessionID) as IFriendRequestListResponse[];

        for (const sentFriendRequest of sentFriendRequests) {
            const profile = this.profileHelper.getPmcProfile(sentFriendRequest.to);

            sentFriendRequest.profile = {
                _id: profile._id,
                aid: profile.aid,
                Info: {
                    Nickname: profile.Info.Nickname,
                    Side: profile.Info.Side,
                    Level: profile.Info.Level,
                    MemberCategory: profile.Info.MemberCategory,
                },
            };
        }

        return sentFriendRequests;
    }

    public listInbox(sessionID: string): IFriendRequestListResponse[] {
        const receivedFriendRequests = this.fikaFriendRequestsHelper.getReceivedFriendRequests(sessionID) as IFriendRequestListResponse[];

        for (const receivedFriendRequest of receivedFriendRequests) {
            const profile = this.profileHelper.getPmcProfile(receivedFriendRequest.from);

            receivedFriendRequest.profile = {
                _id: profile._id,
                aid: profile.aid,
                Info: {
                    Nickname: profile.Info.Nickname,
                    Side: profile.Info.Side,
                    Level: profile.Info.Level,
                    MemberCategory: profile.Info.MemberCategory,
                },
            };
        }

        return receivedFriendRequests;
    }

    public sendFriendRequest(from: string, to: string): IFriendRequestSendResponse {
        const senderProfile = this.profileHelper.getProfileByPmcId(from);
        if (!senderProfile) {
            this.logger.error(`Failed to find profile for Sender:${from}`);
            return {
                status: BackendErrorCodes.PLAYERPROFILENOTFOUND,
                requestId: null,
                retryAfter: 0,
            };
        }

        const targetProfile = this.profileHelper.getProfileByPmcId(to);
        if (!targetProfile) {
            this.logger.error(`Failed to find profile for Target:${to}`);
            return {
                status: BackendErrorCodes.PLAYERPROFILENOTFOUND,
                requestId: null,
                retryAfter: 0,
            };
        }

        const requestId = this.fikaFriendRequestsHelper.addFriendRequest(from, to);
        if (!requestId) {
            return {
                status: BackendErrorCodes.TOOMANYFRIENDREQUESTS,
                requestId: null,
                retryAfter: 0,
            };
        }

        const targetWebSocket: WebSocket = this.webSocketServer.getSessionWebSocket(to);
        if (targetWebSocket) {
            this.webSocketServer.sendMessage(
                to,
                {
                    type: "friendListNewRequest",
                    eventId: "friendListNewRequest",
                    _id: requestId,
                    profile: {
                        _id: senderProfile._id,
                        AccountId: senderProfile.aid,
                        Info: {
                            Nickname: senderProfile.Info.Nickname,
                            Side: senderProfile.Info.Side,
                            Level: senderProfile.Info.Level,
                            MemberCategory: senderProfile.Info.MemberCategory,
                            Ignored: false,
                            Banned: senderProfile.Info.BannedState
                        }
                    }
                } as any
            );
        }
        else {
            this.logger.warning(`Failed to find WebSocket for ${to} (sessionId: ${to}), they will not be notified of this friend request`);
        }

        return {
            status: BackendErrorCodes.NONE,
            requestId: requestId,
            retryAfter: 0,
        };
    }

    public acceptAllFriendRequests(sessionID: string): void {
        const receivedFriendRequests = this.fikaFriendRequestsHelper.getReceivedFriendRequests(sessionID);

        for (const friendRequest of receivedFriendRequests) {
            this.acceptFriendRequest(friendRequest.from, friendRequest.to);
        }
    }

    public acceptFriendRequest(from: string, to: string): void {
        const receiverProfile = this.profileHelper.getPmcProfile(to);
        if (!receiverProfile) {
            return;
        }

        if (!this.fikaFriendRequestsHelper.removeFriendRequest(from, to)) {
            return;
        }

        this.fikaPlayerRelationsHelper.addFriend(from, to);

        const senderWebSocket: WebSocket = this.webSocketServer.getSessionWebSocket(from);
        if (senderWebSocket) {
            this.webSocketServer.sendMessage(
                from,
                {
                    type: "friendListRequestAccept",
                    eventId: "friendListRequestAccept",
                    profile: {
                        _id: receiverProfile._id,
                        AccountId: receiverProfile.aid,
                        Info: {
                            Nickname: receiverProfile.Info.Nickname,
                            Side: receiverProfile.Info.Side,
                            Level: receiverProfile.Info.Level,
                            MemberCategory: receiverProfile.Info.MemberCategory,
                            Ignored: false,
                            Banned: receiverProfile.Info.BannedState
                        }
                    }
                } as any
            );
        }
    }

    public cancelFriendRequest(from: string, to: string): void {
        const senderProfile = this.profileHelper.getPmcProfile(from);
        if (!senderProfile) {
            return;
        }

        if (!this.fikaFriendRequestsHelper.removeFriendRequest(from, to)) {
            return;
        }

        const targetWebSocket: WebSocket = this.webSocketServer.getSessionWebSocket(to);
        if (targetWebSocket) {
            this.webSocketServer.sendMessage(
                to,
                {
                    type: "friendListRequestCancel",
                    eventId: "friendListRequestCancel",
                    profile: {
                        _id: senderProfile._id,
                        AccountId: senderProfile.aid,
                        Info: {
                            Nickname: senderProfile.Info.Nickname,
                            Side: senderProfile.Info.Side,
                            Level: senderProfile.Info.Level,
                            MemberCategory: senderProfile.Info.MemberCategory,
                            Ignored: false,
                            Banned: senderProfile.Info.BannedState
                        }
                    }
                } as any
            );
        }
    }

    public declineFriendRequest(from: string, to: string): void {
        const receiverProfile = this.profileHelper.getPmcProfile(to);
        if (!receiverProfile) {
            return;
        }

        if (!this.fikaFriendRequestsHelper.removeFriendRequest(from, to)) {
            return;
        }

        const senderWebSocket: WebSocket = this.webSocketServer.getSessionWebSocket(from);
        if (senderWebSocket) {
            this.webSocketServer.sendMessage(
                from,
                {
                    type: "friendListRequestDecline",
                    eventId: "friendListRequestDecline",
                    profile: {
                        _id: receiverProfile._id,
                        AccountId: receiverProfile.aid,
                        Info: {
                            Nickname: receiverProfile.Info.Nickname,
                            Side: receiverProfile.Info.Side,
                            Level: receiverProfile.Info.Level,
                            MemberCategory: receiverProfile.Info.MemberCategory,
                            Ignored: false,
                            Banned: receiverProfile.Info.BannedState
                        }
                    }
                } as any
            );
        }
    }

    public deleteFriend(fromId: string, friendId: string): void {
        this.fikaPlayerRelationsHelper.removeFriend(fromId, friendId);
    }

    public ignoreFriend(fromId: string, friendId: string): void {
        this.fikaPlayerRelationsHelper.addToIgnoreList(fromId, friendId);
    }

    public unIgnoreFriend(fromId: string, friendId: string): void {
        this.fikaPlayerRelationsHelper.removeFromIgnoreList(fromId, friendId);
    }
}
