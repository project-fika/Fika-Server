import { inject, injectable } from "tsyringe";

import { LocationController } from "@spt/controllers/LocationController";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { HashUtil } from "@spt/utils/HashUtil";
import { NotificationEventType } from "@spt/models/enums/NotificationEventType";
import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { IWsGroupMatchInviteDecline } from "@spt/models/eft/ws/IWsGroupMatchInviteDecline";
import { IWsGroupMatchInviteAccept } from "@spt/models/eft/ws/IWsGroupMatchInviteAccept";
import { IWsGroupMatchInviteSend } from "@spt/models/eft/ws/IWsGroupMatchInviteSend";
import { IWsGroupMatchLeaderChanged } from "@spt/models/eft/ws/IWsGroupMatchLeaderChanged";
import { IWsAidNickname } from "@spt/models/eft/ws/IWsAidNickname";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";

import { FikaConfig } from "../utils/FikaConfig";
import { IRaidSettings } from "@spt/models/eft/match/IRaidSettings";
import { IWsGroupMatchRaidSettings } from "@spt/models/eft/ws/IWsGroupMatchRaidSettings";

@injectable()
export class FikaGroupService {
    protected invites: Map<string, string>;
    protected inviters: Map<string, string>;
    protected groups: Map<string, IGroupCharacter[]>;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("LocationController") protected locationController: LocationController,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("NotificationSendHelper") protected notifications: NotificationSendHelper,
    ) {
        this.invites = new Map();
        this.inviters = new Map();
        this.groups = new Map();
    }

    public getGroup(groupId: string): IGroupCharacter[] | null {
        return this.groups.get(groupId) ?? [];
    }

    public getGroupByMember(memberId: string) {
        const groupId = this.getGroupIdByMember(memberId);
        return this.getGroup(groupId) ?? [];
    }

    public getGroupIdByMember(sessionID: string) {
        for (const [gid, group] of this.groups) {
            if (group.find(p => p._id === sessionID)) {
                return gid;
            }
        }
        return null;
    }

    public groupHasMember(groupId: string, sessionID: string): boolean {
        const group = this.getGroup(groupId);
        return !!group.find(p => p._id === sessionID);
    }

    public getGroupMember(groupId: string, sessionID: string): IGroupCharacter | null {
        const group = this.getGroup(groupId);
        if (!group) return null;

        for (const member of group) {
            if (member._id === sessionID) {
                return member;
            }
        }

        return null;
    }

    public getGroupLeader(groupId: string): IGroupCharacter | null {
        const group = this.getGroup(groupId);
        if (!group) return null

        for (const member of group) {
            if (member.IsLeader) return member;
        }

        return null;
    }

    public groupMemberReady(groupId: string, sessionID: string) {
        const group = this.getGroup(groupId);
        if (!group) return;
        for (const member of group) {
            if (member._id === sessionID) {
                member.IsReady = true;
            }
        }
        this.groups.set(groupId, group);
        return group;
    }

    public groupMemberNotReady(groupId: string, sessionID: string) {
        const group = this.getGroup(groupId);
        if (!group) return;
        for (const member of group) {
            if (member._id === sessionID) {
                member.IsReady = false;
            }
        }
        this.groups.set(groupId, group);
        return group;
    }

    public sendInvite(to: string, from: string, inLobby = false) {
        this.logger.info(`[FikaGroupService] sendInvite: to=${to}, from=${from}, inLobby=${inLobby}`)
        const sender = this.saveServer.getProfile(from);

        let groupId = this.getGroupIdByMember(from);
        if (!groupId) {
            // Start a new group from the invitation
            groupId = this.createGroup();
            this.addMember(groupId, from, true);
        }

        const group = this.getGroup(groupId);

        const inviteId = to + groupId;
        this.invites.set(inviteId, groupId);
        this.inviters.set(inviteId, from);

        const notification: IWsGroupMatchInviteSend = {
            type: NotificationEventType.GROUP_MATCH_INVITE_SEND,
            eventId: this.hashUtil.generate(),
            requestId: inviteId,
            from: sender.info.aid,
            members: group
        }

        this.notifications.sendMessage(to, notification);

        return inviteId
    }

    public acceptInvite(requestId: string, sessionID: string) {
        const groupId = this.invites.get(requestId);
        if (!groupId) [];

        const member = this.addMember(groupId, sessionID);
        const members = this.getGroup(groupId);

        if (!member) return members ?? [];

        for (const m of members) {
            const notification: IWsGroupMatchInviteAccept = {
                type: NotificationEventType.GROUP_MATCH_INVITE_ACCEPT,
                eventId: this.hashUtil.generate(),
                ...member
            }

            this.notifications.sendMessage(m._id, notification);
        }

        this.invites.delete(requestId);
        this.inviters.delete(requestId);

        return this.getGroup(groupId);
    }

    public declineInvite(requestId: string, sessionID: string) {
        try {
            const groupId = this.invites.get(requestId);
            const inviter = this.inviters.get(requestId);
            if (!groupId || !inviter) return false;

            const profile = this.saveServer.getProfile(sessionID);
            const notification: IWsGroupMatchInviteDecline = {
                type: NotificationEventType.GROUP_MATCH_INVITE_DECLINE,
                eventId: this.hashUtil.generate(),
                aid: profile.info.aid,
                Nickname: profile.characters.pmc.Info.Nickname
            }

            this.notifications.sendMessage(inviter, notification);

            this.invites.delete(requestId);
            this.inviters.delete(requestId);

            return true;
        } catch (err) {
            this.logger.error("[FikaGroupService] declineInvite error")
            this.logger.error(err)
            return false;
        }
    }

    public cancelInvite(requestId: string) {
        const groupId = this.invites.get(requestId);
        if (!groupId) return false;

        this.invites.delete(requestId);
        this.inviters.delete(requestId);

        return true;
    }

    public cancelAllInvites(groupId: string, sessionID: string) {
        const group = this.getGroup(groupId);
        if (!group) return false;

        const leader = this.getGroupLeader(groupId);
        if (leader?._id !== sessionID) return false; // Only leader can cancel

        for (const [invite, inviteGroupId] of this.invites) {
            if (groupId === inviteGroupId) {
                this.invites.delete(invite);
            }
        }

        return true;
    }

    public transferGroup(groupId: string, from: string, to: string) {
        try {
            const group = this.getGroup(groupId);
            if (!group) return false;

            const leader = this.getGroupLeader(groupId);
            if (leader._id !== from) return false; // Only leader can transfer

            const transferee = this.getGroupMember(groupId, to);
            if (!transferee) return false;

            if (!this.changeLeader(groupId, to)) return false;

            const ownerProfile = this.saveServer.getProfile(to);
            if (!ownerProfile) return false;

            const notification: IWsGroupMatchLeaderChanged = {
                type: NotificationEventType.GROUP_MATCH_LEADER_CHANGED,
                eventId: this.hashUtil.generate(),
                owner: Number(ownerProfile.info.aid)
            }

            for (const member of group) {
                if (member._id === from) continue;
                this.notifications.sendMessage(member._id, notification);
            }

            return true;
        } catch (err) {
            return false;
        }
    }

    public kickPlayer(groupId: string, sessionID: string, playerID: string) {
        try {
            const group = this.getGroup(groupId);
            if (!group) return false;

            const leader = this.getGroupLeader(groupId);
            if (leader._id !== sessionID) return false; // Only leader can kick

            const kickee = this.getGroupMember(groupId, playerID);
            if (!kickee) return false;

            this.notifications.sendMessage(kickee._id, {
                type: NotificationEventType.GROUP_MATCH_USER_LEAVE,
                eventId: this.hashUtil.generate(),
            } as IWsNotificationEvent)

            return this.leaveGroup(groupId, playerID);
        } catch (err) {
            this.logger.error(`[FikaGroupService] kickPlayer error`);
            this.logger.error(err);
            return false;
        }
    }

    public leaveGroup(groupId: string, sessionID: string): boolean {
        try {
            const group = this.getGroup(groupId);
            if (!group) return false;

            const leader = this.getGroupLeader(groupId);
            if (leader._id === sessionID) return this.disbandGroup(groupId);

            const leaver = this.getGroupMember(groupId, sessionID);
            if (!leaver) return false;

            for (const member of group) {
                if (member._id === sessionID) continue;

                this.notifications.sendMessage(member._id, {
                    type: NotificationEventType.GROUP_MATCH_USER_LEAVE,
                    eventId: this.hashUtil.generate(),
                    aid: leaver.aid,
                    Nickname: leaver.Info.Nickname
                } as IWsAidNickname)
            }

            return !!this.removeMember(groupId, sessionID);
        } catch (err) {
            this.logger.error(`[FikaGroupService] leaveGroup error`);
            this.logger.error(err);
            return false;
        }
    }

    public disbandGroup(groupId: string) {
        const group = this.getGroup(groupId);

        for (const member of group) {
            const removed = this.removeMember(groupId, member._id);
            if (removed) {
                const notification: IWsNotificationEvent = {
                    type: NotificationEventType.GROUP_MATCH_WAS_REMOVED,
                    eventId: this.hashUtil.generate(),
                }

                this.notifications.sendMessage(member._id, notification)
            }
        }


        this.deleteGroup(groupId);

        for (const [invite] of this.inviters) {
            if (this.invites.get(invite) === groupId) {
                this.inviters.delete(invite);
            }
        }

        for (const [invite, gid] of this.invites) {
            if (groupId === gid) {
                this.invites.delete(invite);
            }
        }

        return true;
    }

    public sendRaidSettings(groupId: string, raidSettings: IRaidSettings) {
        const group = this.getGroup(groupId);
        for (const member of group) {
            const notification: IWsGroupMatchRaidSettings = {
                type: NotificationEventType.GROUP_MATCH_RAID_SETTINGS,
                eventId: this.hashUtil.generate(),
                raidSettings
            }

            this.notifications.sendMessage(member._id, notification);
        }
    }

    private changeLeader(groupId: string, newLeaderId: string) {
        try {
            const members = this.getGroup(groupId);
            for (const member of members) {
                member.IsLeader = member._id === newLeaderId
            }
            this.groups.set(groupId, members);
            return true;
        } catch (err) {
            return false;
        }
    }

    private createGroup() {
        const groupId = this.hashUtil.generate();
        this.logger.info(`[FikaGroupService] Created group ${groupId}`)
        this.groups.set(groupId, []);
        return groupId;
    }

    private deleteGroup(groupId: string) {
        this.groups.delete(groupId);
    }

    private addMember(groupId: string, member: IGroupCharacter | string, leader = false): IGroupCharacter | null {
        const group = this.getGroup(groupId);
        if (group) {
            const memberId = typeof member === 'string' ? member : member._id;
            if (!this.groupHasMember(groupId, memberId)) {
                let memberObj: IGroupCharacter;
                if (typeof member === 'string') {
                    const profile = this.saveServer.getProfile(memberId);
                    memberObj = {
                        _id: memberId,
                        aid: profile.info.aid,
                        IsLeader: leader,
                        IsReady: false,
                        lookingGroup: false,
                        Info: {
                            Nickname: profile.characters.pmc.Info.Nickname,
                            SavageNickname: profile.characters.scav.Info.Nickname,
                            SavageLockTime: profile.characters.scav.Info.SavageLockTime,
                            Side: profile.characters.pmc.Info.Side,
                            Level: profile.characters.pmc.Info.Level,
                            MemberCategory: profile.characters.pmc.Info.MemberCategory,
                            SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                            GameVersion: profile.characters.pmc.Info.GameVersion,
                        },
                        PlayerVisualRepresentation: {
                            Info: {
                                Nickname: profile.characters.pmc.Info.Nickname,
                                Side: profile.characters.pmc.Info.Side,
                                Level: profile.characters.pmc.Info.Level,
                                MemberCategory: profile.characters.pmc.Info.MemberCategory,
                                SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                                GameVersion: profile.characters.pmc.Info.GameVersion,
                            },
                            Customization: profile.characters.pmc.Customization,
                            Equipment: {
                                Id: profile.characters.pmc.Inventory.equipment,
                                Items: profile.characters.pmc.Inventory.items
                            }
                        }
                    };
                } else {
                    memberObj = member;
                }
                group.push(memberObj);
                this.groups.set(groupId, group);

                return memberObj;
            }
        }
        return null;
    }

    private removeMember(groupId: string, sessionId: string) {
        const group = this.getGroup(groupId);
        if (group) {
            if (this.groupHasMember(groupId, sessionId)) {
                const index = group.findIndex(p => p._id === sessionId);

                const arr = [...group];
                const [removed] = arr.splice(index, 1);
                this.groups.set(groupId, arr);

                return removed;
            }
        }
        return null;
    }
}
