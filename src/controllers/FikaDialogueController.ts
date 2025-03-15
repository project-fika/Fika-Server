import { inject, injectable } from "tsyringe";

import { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";
import { BackendErrorCodes } from "@spt/models/enums/BackendErrorCodes";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";

import { DialogueController } from "@spt/controllers/DialogueController";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IMessage, IReplyTo } from "@spt/models/eft/profile/ISptProfile";
import { MessageType } from "@spt/models/enums/MessageType";
import { SaveServer } from "@spt/servers/SaveServer";
import { SptWebSocketConnectionHandler } from "@spt/servers/ws/SptWebSocketConnectionHandler";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { FikaFriendRequestsHelper } from "../helpers/FikaFriendRequestsHelper";
import { FikaPlayerRelationsHelper } from "../helpers/FikaPlayerRelationsHelper";
import { IFriendRequestListResponse } from "../models/eft/dialog/IFriendRequestListResponse";

@injectable()
export class FikaDialogueController {
    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("DialogueHelper") protected dialogueHelper: DialogueHelper,
        @inject("FikaFriendRequestsHelper") protected fikaFriendRequestsHelper: FikaFriendRequestsHelper,
        @inject("FikaPlayerRelationsHelper") protected fikaPlayerRelationsHelper: FikaPlayerRelationsHelper,
        @inject("DialogueController") protected dialogueController: DialogueController,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("SptWebSocketConnectionHandler") protected webSocketHandler: SptWebSocketConnectionHandler,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        // empty
    }

    public getFriendList(sessionID: string): IGetFriendListDataResponse {
        let botsAndFriends = (this.dialogueController as any).getActiveChatBots();

        const friendsIds = this.fikaPlayerRelationsHelper.getFriendsList(sessionID);

        for (const friendId of friendsIds) {
            const profile = this.profileHelper.getPmcProfile(friendId);

            if (!profile) {
                this.fikaPlayerRelationsHelper.removeFriend(sessionID, friendId);
                continue;
            }

            botsAndFriends.push({
                _id: profile._id,
                aid: profile.aid,
                Info: {
                    Nickname: profile.Info.Nickname,
                    Level: profile.Info.Level,
                    Side: profile.Info.Side,
                    MemberCategory: profile.Info.MemberCategory,
                    SelectedMemberCategory: profile.Info.SelectedMemberCategory,
                },
            } as any);
        }

        return {
            Friends: botsAndFriends,
            Ignore: this.fikaPlayerRelationsHelper.getIgnoreList(sessionID),
            InIgnoreList: this.fikaPlayerRelationsHelper.getInIgnoreList(sessionID),
        };
    }

    public sendMessage(sessionID: string, request: ISendMessageRequest): string {
        const profiles = this.saveServer.getProfiles();
        if (!(sessionID in profiles) || !(request.dialogId in profiles)) {
            // if it's not to another player let SPT handle it
            return DialogueController.prototype.sendMessage.call(this.dialogueController, sessionID, request);
        }

        const receiverProfile = profiles[request.dialogId];
        const senderProfile = profiles[sessionID];
        if (!(request.dialogId in senderProfile.dialogues)) {
            senderProfile.dialogues[request.dialogId] = {
                attachmentsNew: 0,
                new: 0,
                pinned: false,
                type: MessageType.USER_MESSAGE,
                messages: [],
                Users: [],
                _id: request.dialogId,
            };
        }

        const senderDialog = senderProfile.dialogues[request.dialogId];
        senderDialog.Users = [
            {
                _id: receiverProfile.info.id,
                aid: receiverProfile.info.aid,
                Info: {
                    Nickname: receiverProfile.characters.pmc.Info.Nickname,
                    Side: receiverProfile.characters.pmc.Info.Side,
                    Level: receiverProfile.characters.pmc.Info.Level,
                    MemberCategory: receiverProfile.characters.pmc.Info.MemberCategory,
                    SelectedMemberCategory: receiverProfile.characters.pmc.Info.SelectedMemberCategory,
                },
            },
            {
                _id: senderProfile.info.id,
                aid: senderProfile.info.aid,
                Info: {
                    Nickname: senderProfile.characters.pmc.Info.Nickname,
                    Side: senderProfile.characters.pmc.Info.Side,
                    Level: senderProfile.characters.pmc.Info.Level,
                    MemberCategory: senderProfile.characters.pmc.Info.MemberCategory,
                    SelectedMemberCategory: receiverProfile.characters.pmc.Info.SelectedMemberCategory,
                },
            },
        ];

        if (!(sessionID in receiverProfile.dialogues)) {
            receiverProfile.dialogues[sessionID] = {
                attachmentsNew: 0,
                new: 0,
                pinned: false,
                type: MessageType.USER_MESSAGE,
                messages: [],
                _id: sessionID,
                Users: [],
            };
        }

        const receiverDialog = receiverProfile.dialogues[sessionID];
        receiverDialog.new++;
        receiverDialog.Users = [
            {
                _id: senderProfile.info.id,
                aid: senderProfile.info.aid,
                Info: {
                    Nickname: senderProfile.characters.pmc.Info.Nickname,
                    Side: senderProfile.characters.pmc.Info.Side,
                    Level: senderProfile.characters.pmc.Info.Level,
                    MemberCategory: senderProfile.characters.pmc.Info.MemberCategory,
                    SelectedMemberCategory: receiverProfile.characters.pmc.Info.SelectedMemberCategory,
                },
            },
            {
                _id: receiverProfile.info.id,
                aid: receiverProfile.info.aid,
                Info: {
                    Nickname: receiverProfile.characters.pmc.Info.Nickname,
                    Side: receiverProfile.characters.pmc.Info.Side,
                    Level: receiverProfile.characters.pmc.Info.Level,
                    MemberCategory: receiverProfile.characters.pmc.Info.MemberCategory,
                    SelectedMemberCategory: receiverProfile.characters.pmc.Info.SelectedMemberCategory,
                },
            },
        ];

        const message: IMessage = {
            _id: this.hashUtil.generate(),
            uid: sessionID,
            type: request.type,
            Member: {
                Nickname: senderProfile.characters.pmc.Info.Nickname,
                Side: senderProfile.characters.pmc.Info.Side,
                Level: senderProfile.characters.pmc.Info.Level,
                MemberCategory: senderProfile.characters.pmc.Info.MemberCategory,
                Ignored: this.fikaPlayerRelationsHelper.getInIgnoreList(sessionID).includes(request.dialogId),
                Banned: false,
            },
            dt: this.timeUtil.getTimestamp(),
            text: request.text,
            rewardCollected: false,
        };

        if (request.replyTo) {
            const replyMessage = this.getMessageToReplyTo(request.dialogId, request.replyTo, sessionID);
            if (replyMessage) {
                message.replyTo = replyMessage;
            }
        }

        senderDialog.messages.push(message);
        receiverDialog.messages.push(message);

        this.webSocketHandler.sendMessageAsync(receiverProfile.info.id, {
            type: "new_message",
            eventId: "new_message",
            EventId: "new_message",
            dialogId: sessionID,
            message: message,
        } as any);

        return message._id;
    }

    /**
     * @param recipientId The id of the recipient
     * @param replyToId The id of the message to reply to
     * @param dialogueId The id of the dialogue (traderId or profileId)
     * @returns A new instance with data from the found message, otherwise undefined
     */
    private getMessageToReplyTo(recipientId: string, replyToId: string, dialogueId: string): IReplyTo | undefined {
        let message: IReplyTo | undefined = undefined;
        const currentDialogue = this.dialogueHelper.getDialogueFromProfile(recipientId, dialogueId);

        if (!currentDialogue) {
            this.logger.warning(`Could not find dialogue ${dialogueId} from sender`);
            return message;
        }

        for (const dialogueMessage of currentDialogue.messages) {
            if (dialogueMessage._id === replyToId) {
                message = {
                    _id: dialogueMessage._id,
                    dt: dialogueMessage.dt,
                    type: dialogueMessage.type,
                    uid: dialogueMessage.uid,
                    text: dialogueMessage.text,
                };
                break;
            }
        }

        return message;
    }

    public listOutbox(sessionID: string): IFriendRequestListResponse[] {
        const sentFriendRequests = this.fikaFriendRequestsHelper.getSentFriendRequests(sessionID) as IFriendRequestListResponse[];

        for (const sentFriendRequest of sentFriendRequests) {
            const profile = this.profileHelper.getPmcProfile(sentFriendRequest.to);

            if (!profile) {
                continue;
            }

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

            if (!profile) {
                continue;
            }

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
        this.fikaFriendRequestsHelper.addFriendRequest(from, to);

        return {
            status: BackendErrorCodes.NONE,
            requestId: from,
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
        this.fikaFriendRequestsHelper.removeFriendRequest(from, to, "accept");

        this.fikaPlayerRelationsHelper.addFriend(from, to);
    }

    public cancelFriendRequest(from: string, to: string): void {
        this.fikaFriendRequestsHelper.removeFriendRequest(from, to, "cancel");
    }

    public declineFriendRequest(from: string, to: string): void {
        this.fikaFriendRequestsHelper.removeFriendRequest(from, to, "decline");
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
