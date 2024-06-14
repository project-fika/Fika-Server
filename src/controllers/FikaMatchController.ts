import { inject, injectable } from "tsyringe";

import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";

import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupInviteSendRequest } from "@spt/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IMatchGroupTransferRequest } from "@spt/models/eft/match/IMatchGroupTransferRequest";
import { IProfileStatusRequest } from "@spt/models/eft/match/IProfileStatusRequest";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IRequestIdRequest } from "@spt/models/eft/match/IRequestIdRequest";

import { FikaMatchService } from "../services/FikaMatchService";
import { SaveServer } from "@spt/servers/SaveServer";
import { HashUtil } from "@spt/utils/HashUtil";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { SptWebSocketConnectionHandler } from "@spt/servers/ws/SptWebSocketConnectionHandler";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { SideType } from "@spt/models/enums/SideType";

class Group {
    public owner: number;
    public invites: Record<string, IGroupInvite>;
    public members: Record<number, IGroupCharacter>;

    constructor(owner: number, ownerCharacter: IGroupCharacter) {
        this.owner = owner;
        this.invites = {};
        this.members = {};
        this.members[owner] = ownerCharacter;
    }
}

interface IGroupInvite {
    sender: number;
    recipient: number;
}

@injectable()
export class FikaMatchController {
    private groups: Group[];
    static hasStarted: boolean = false;

    constructor(
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("SptWebSocketConnectionHandler") protected webSocketHandler: SptWebSocketConnectionHandler,
    ) {
        this.groups = [];
        this.logger.info("FikaMatchController constructed");
    }

    createPlayerVisualRepresentation(aid: number, isPMC: boolean): any {
        const profile = this.getProfileByAID(aid);
        const visualizedProfile = isPMC ? profile.characters.pmc : profile.characters.scav;
        return {
            Info: {
                Side: visualizedProfile.Info.Side,
                Level: visualizedProfile.Info.Level,
                Nickname: visualizedProfile.Info.Nickname,
                MemberCategory: visualizedProfile.Info.MemberCategory,
                GameVersion: visualizedProfile.Info.GameVersion,
            },
            Customization: visualizedProfile.Customization,
            Equipment: {
                Id: visualizedProfile.Inventory.equipment,
                Items: visualizedProfile.Inventory.items
            }
        };
    }

    createGroupCharacter(profile: ISptProfile): IGroupCharacter {
        return {
            _id: profile.info.id,
            aid: profile.info.aid,
            Info: {
                Nickname: profile.characters.pmc.Info.Nickname,
                Side: profile.characters.pmc.Info.Side,
                Level: profile.characters.pmc.Info.Level,
                MemberCategory: profile.characters.pmc.Info.MemberCategory,
                GameVersion: profile.characters.pmc.Info.GameVersion,
                SavageLockTime: profile.characters.scav.Info.SavageLockTime,
                SavageNickname: profile.characters.scav.Info.Nickname,
                hasCoopExtension: true,
            },
            PlayerVisualRepresentation: null,
            isLeader: false
        };
    }

    getProfileByAID(aid: number): ISptProfile {
        for (const profile of Object.values(this.saveServer.getProfiles())) {
            if (profile.info.aid == aid) {
                return profile;
            }
        }

        return undefined;
    }

    getGroup(aid: number): Group {
        return this.groups.find(g => aid in g.members);
    }

    getOrCreateGroup(aid: number): Group {
        const group = this.getGroup(aid);
        if (!group) {
            const ownerProfile = this.getProfileByAID(aid);
            const groupCharacter = this.createGroupCharacter(ownerProfile);
            groupCharacter.isLeader = true;
            const newGroup = new Group(aid, groupCharacter);
            this.groups.push(newGroup);

            return newGroup;
        }

        return group;
    }

    /** Handle /client/match/exit */
    public handleMatchExit(sessionID: string): void {
        this.logger.warning("Default implementation of handleMatchExit");
    }

    /** Handle /client/match/group/current */
    public handleMatchGroupCurrent(sessionID: string): IMatchGroupCurrentResponse {
        this.logger.warning("Default implementation of handleMatchGroupCurrent");
        return {
            squad: [],
        };
    }

    /** Handle /client/match/group/delete */
    public handleMatchGroupDelete(sessionID: string): boolean {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.getGroup(profile.info.aid);
        if (!group) {
            this.logger.error(`${profile.info.aid} tried to disband their group but they are not in one`);
            return false;
        }

        if (group.owner != profile.info.aid) {
            this.logger.warning(`${profile.info.aid} tried to disband their group but they are not the owner`);
            return false;
        }

        for (const member of Object.values(group.members)) {
            if (member.aid == profile.info.aid) {
                continue;
            }

            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchWasRemoved",
                eventId: "groupMatchWasRemoved",
            } as any);
        }

        this.groups.splice(this.groups.indexOf(group), 1);

        return true;
    }

    /** Handle /client/match/group/exit_from_menu */
    public handleMatchGroupExitFromMenu(sessionID: string): void {
        this.logger.warning("Default implementation of handleMatchGroupExitFromMenu");
    }

    /** Handle /client/match/group/invite/accept */
    public handleMatchGroupInviteAccept(info: IRequestIdRequest, sessionID: string): IGroupCharacter[] {
        const group = this.groups.find(g => info.requestId in g.invites);
        if (!group) {
            this.logger.error(`handleMatchGroupInviteAccept: Failed to find invite ${info.requestId}`);
            return [];
        }

        delete group.invites[info.requestId];
        const profile = this.saveServer.getProfile(sessionID);
        const profileInfo: IGroupCharacter = this.createGroupCharacter(profile);

        group.members[profile.info.aid] = profileInfo;

        for (const member of Object.values(group.members)) {
            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchInviteAccept",
                eventId: "groupMatchInviteAccept",
                aid: profile.info.aid,
                _id: profile.info.id,
                Info: profileInfo.Info,
                IsReady: false,
                PlayerVisualRepresentation: null
            } as any);
        }

        return Object.values(group.members);
    }

    /** Handle /client/match/group/invite/cancel */
    public handleMatchGroupInviteCancel(info: IRequestIdRequest, sessionID: string): boolean {
        const group = this.groups.find(g => info.requestId in g.invites);
        if (!group) {
            this.logger.error(`handleMatchGroupInviteCancel: Failed to find group with invite ${info.requestId}`);
            return false;
        }

        const invite = group.invites[info.requestId];
        if (!invite) {
            this.logger.error(`handleMatchGroupInviteCancel: Failed to find invite ${info.requestId} in group`);
            return false;
        }

        delete group.invites[info.requestId];
        const senderProfile = this.getProfileByAID(invite.sender);
        const recipientProfile = this.getProfileByAID(invite.recipient);

        this.webSocketHandler.sendMessage(recipientProfile.info.id, {
            "type": "groupMatchInviteCancel",
            "eventId": "groupMatchInviteCancel",
            "aid": senderProfile.info.aid,
            "nickname": senderProfile.characters.pmc.Info.Nickname
        } as any);

        this.logger.info(`handleMatchGroupInviteCancel: Successfully canceled invite ${info.requestId} from ${invite.sender} to ${invite.recipient}`);

        return true;
    }

    /** Handle /client/match/group/invite/cancel-all */
    public handleMatchGroupInviteCancelAll(sessionID: string): boolean {
        const profile = this.saveServer.getProfile(sessionID);
        const aid = profile.info.aid;
        const group = this.groups.find(g => g.owner == aid);
        if (!group) {
            this.logger.error(`handleMatchGroupInviteCancelAll: Failed to get group where ${aid} is the owner`);
            return false;
        }

        for (const invite of Object.values(group.invites)) {
            const recipient = this.getProfileByAID(invite.recipient);
            if (!recipient) {
                continue;
            }

            this.webSocketHandler.sendMessage(recipient.info.id, {
                "type": "groupMatchInviteCancel",
                "eventId": "groupMatchInviteCancel",
                "aid": recipient.info.aid,
                "nickname": recipient.characters.pmc.Info.Nickname
            } as any);
        }

        for (const member of Object.values(group.members)) {
            this.webSocketHandler.sendMessage(member._id, {
                "type": "groupMatchUserLeave",
                "eventId": "groupMatchUserLeave",
                "aid": aid,
                "Nickname": member.Info.Nickname
            } as any);
        }

        return true;
    }

    /** Handle /client/match/group/invite/decline */
    public handleMatchGroupInviteDecline(info: IRequestIdRequest, sessionID: string): boolean {
        const group = this.groups.find(g => info.requestId in g.invites);
        if (!group) {
            this.logger.error(`handleMatchGroupInviteDecline: Failed to find group with invite ${info.requestId}`);
            return false;
        }

        const invite = group.invites[info.requestId];
        if (!invite) {
            this.logger.error(`handleMatchGroupInviteDecline: Failed to find invite ${info.requestId} in group`);
            return false;
        }

        delete group.invites[info.requestId];
        const recipientProfile = this.getProfileByAID(invite.recipient);
        const senderProfile = this.getProfileByAID(invite.sender);

        this.webSocketHandler.sendMessage(senderProfile.info.id, {
            "type": "groupMatchInviteDecline",
            "eventId": "groupMatchInviteDecline",
            "aid": recipientProfile.info.aid,
            "Nickname": recipientProfile.characters.pmc.Info.Nickname
        } as any);

        this.logger.info(`handleMatchGroupInviteDecline: Invite ${info.requestId} from ${invite.sender} to ${invite.recipient} declined successfully`);

        return true;
    }

    /** Handle /client/match/group/invite/send */
    public handleMatchGroupInviteSend(info: IMatchGroupInviteSendRequest, sessionID: string): string {
        const senderProfile = this.saveServer.getProfile(sessionID);
        const senderAid = senderProfile.info.aid;
        const recipientAid = Number.parseInt(info.to);
        const recipientProfile = this.getProfileByAID(recipientAid);
        if (!recipientProfile) {
            this.logger.error(`${senderAid} tried to invite ${info.to} but we couldn't find their profile. Are they a bot?`);

            return null;
        }

        this.logger.info(`handleMatchGroupInviteSend: ${senderAid}->${recipientAid} ${(info.inLobby ? "in lobby" : "not in lobby")}`);
        const group = this.getOrCreateGroup(senderAid);

        const inviteId = this.hashUtil.generate();
        group.invites[inviteId] = {
            sender: senderAid,
            recipient: recipientAid
        };

        this.webSocketHandler.sendMessage(recipientProfile.info.id, {
            "type": "groupMatchInviteSend",
            "eventId": "groupMatchInviteSend",
            "requestId": inviteId,
            "from": senderAid,
            "members": Object.values(group.members)
        } as any);

        return inviteId;
    }

    /** Handle /client/match/group/leave */
    public handleMatchGroupLeave(sessionID: string): boolean {
        const profileWhoLeft = this.saveServer.getProfile(sessionID);
        const aid = profileWhoLeft.info.aid;
        const group = this.groups.find(g => aid in g.members);
        if (!group) {
            this.logger.error(`handleMatchGroupLeave: ${aid} is not in a group`);
            return false;
        }

        delete group.members[aid];
        this.logger.info(`handleMatchGroupLeave: ${aid} left group owned by ${group.owner}`);

        for (const character of Object.values(group.members)) {
            this.webSocketHandler.sendMessage(character._id, {
                "type": "groupMatchUserLeave",
                "eventId": "groupMatchUserLeave",
                "aid": aid,
                "Nickname": profileWhoLeft.characters.pmc.Info.Nickname
            } as any);
        }

        // do later
        /*
        if (Object.entries(group.members).length === 0) {
            this.logger.info(`handleMatchGroupLeave: Group owned by ${group.owner} is now empty, removing group`);
            this.groups = this.groups.filter(g => g !== group);
        }
        else if (aid === group.owner) {
            this.logger.info(`handleMatchGroupLeave: Owner ${aid} left group, reassigning ownership`);
            const newOwner = group.members.keys().next().value;
            group.owner = newOwner;
            const newLeader = group.members.get(newOwner);
            if (newLeader) {
                newLeader.isLeader = true;
            }

            this.logger.info(`handleMatchGroupLeave: New owner is ${newOwner}`);
        }*/

        return true;
    }

    /** Handle /client/match/group/looking/start */
    public handleMatchGroupLookingStart(sessionID: string): void {
        this.logger.warning("Default implementation of handleMatchGroupLookingStart");
    }

    /** Handle /client/match/group/looking/stop */
    public handleMatchGroupLookingStop(sessionID: string): void {
        this.logger.warning("Default implementation of handleMatchGroupLookingStop");
    }

    /** Handle /client/match/group/player/remove */
    public handleMatchGroupPlayerRemove(info: IMatchGroupPlayerRemoveRequest, sessionID: string): boolean {
        const aid = Number.parseInt(info.aidToKick);
        const group = this.groups.find(g => aid in g.members);
        if (!group) {
            this.logger.error(`handleMatchGroupPlayerRemove: ${sessionID} tried to kick ${aid} from group but they aren't even in one`);
            return false;
        }

        const userWhoLeft = group.members[aid];
        delete group.members[aid];
        for (const character of Object.values(group.members)) {
            this.webSocketHandler.sendMessage(character._id, {
                "type": "groupMatchUserLeave",
                "eventId": "groupMatchUserLeave",
                "aid": aid,
                "Nickname": userWhoLeft.Info.Nickname
            } as any);
        }

        this.webSocketHandler.sendMessage(userWhoLeft._id, {
            "type": "groupMatchUserLeave",
            "eventId": "groupMatchUserLeave",
            "aid": aid,
            "Nickname": userWhoLeft.Info.Nickname
        } as any);

        return true;
    }

    /** Handle /client/match/group/start_game */
    public handleMatchGroupStartGame(info: IMatchGroupStartGameRequest, sessionID: string): IProfileStatusResponse {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.getGroup(profile.info.aid);
        if (!group) {
            this.logger.error(`handleMatchGroupStartGame: ${profile.info.aid} is not in a group`);
            return null;
        }

        if (group.owner != profile.info.aid) {
            this.logger.error(`handleMatchGroupStartGame: ${profile.info.aid} is not the owner of their group`);
            return null;
        }

        return {
            maxPveCountExceeded: false,
            profiles: Object.values(group.members).map(m => {
                return {
                    profileid: m._id,
                    profileToken: m._id,
                    status: "free",
                    ip: "192.168.0.13",
                    port: 25565,
                    sid: "SHORT"
                }
            }),
        };
    }

    /** Handle /client/match/group/status */
    public handleMatchGroupStatus(info: IMatchGroupStatusRequest, sessionID: string): IMatchGroupStatusResponse {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.groups.find(g => g.members[profile.info.aid]);

        return {
            players: Object.values(group.members),
            maxPveCountExceeded: false,
        };
    }

    /** Handle /client/match/group/transfer */
    public handleMatchGroupTransfer(info: IMatchGroupTransferRequest, sessionID: string): boolean {
        const thisPlayerAid = this.saveServer.getProfile(sessionID).info.aid;
        const thisPlayerGroup = this.groups.find(g => thisPlayerAid in g.members);
        if (!thisPlayerGroup) {
            this.logger.error(`handleMatchGroupTransfer: ${thisPlayerAid} is not in a group but tried to transfer leadership`);

            return false;
        }

        const newOwnerAid = Number.parseInt(info.aidToChange);
        thisPlayerGroup.owner = newOwnerAid;
        thisPlayerGroup.members[newOwnerAid].isLeader = true;
        thisPlayerGroup.members[thisPlayerAid].isLeader = false;

        for (const member of Object.values(thisPlayerGroup.members)) {
            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchLeaderChanged",
                eventId: "groupMatchLeaderChanged",
                owner: newOwnerAid
            } as any);
        }

        this.logger.info(`handleMatchGroupTransfer: Changed leader from ${thisPlayerAid}->${newOwnerAid}`);

        return true;
    }

    /** Handle /client/profile/status */
    public handleProfileStatus(info: IProfileStatusRequest, sessionID: string): IProfileStatusResponse {
        this.logger.warning("Default implementation of handleProfileStatus");
        return {
            maxPveCountExceeded: false,
            profiles: [
                // requesting player's
                // - scav
                // - pmc
            ],
        };
    }

    /** Handle /client/match/raid/ready */
    public handleRaidReady(info: IEmptyRequestData, sessionID: string): boolean {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.groups.find(g => profile.info.aid in g.members);
        if (!group) {
            this.logger.error(`handleRaidReady: ${profile.info.aid} set to ready but is not in a group`);

            return false;
        }

        const thisMember = group.members[profile.info.aid];
        thisMember.isReady = true;
        for (const member of Object.values(group.members)) {
            if (member.aid == profile.info.aid) {
                continue;
            }

            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchRaidReady",
                eventId: "groupMatchRaidReady",
                extendedProfile: thisMember
            } as any);
        }

        this.logger.info(`handleRaidReady: ${profile.info.aid} set status to ready`);

        return true;
    }

    /** Handle /client/match/raid/not-ready */
    public handleNotRaidReady(info: IEmptyRequestData, sessionID: string): boolean {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.groups.find(g => profile.info.aid in g.members);
        if (!group) {
            this.logger.error(`handleNotRaidReady: ${profile.info.aid} set to not-ready but is not in a group`);

            return false;
        }

        const thisMember = group.members[profile.info.aid];
        thisMember.isReady = false;

        for (const member of Object.values(group.members)) {
            if (member.aid == thisMember.aid) {
                continue;
            }

            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchRaidNotReady",
                eventId: "groupMatchRaidNotReady",
                aid: thisMember.aid
            } as any);
        }

        this.logger.info(`handleNotRaidReady: ${profile.info.aid} set status to not-ready`);

        return true;
    }

    /** Handle /client/raid/configuration */
    startOfflineRaid(request: IGetRaidConfigurationRequestData, sessionID: string) {
        const profile = this.saveServer.getProfile(sessionID);
        const group = this.getGroup(profile.info.aid);
        if (!group) {
            this.logger.error(`startOfflineRaid: ${sessionID} is not in a group`);

            return;
        }

        for (const member of Object.values(group.members)) {
            member.PlayerVisualRepresentation = this.createPlayerVisualRepresentation(member.aid, request.side == SideType.PMC);
            if (member.aid == profile.info.aid) {
                continue;
            }

            this.webSocketHandler.sendMessage(member._id, {
                type: "groupMatchRaidSettings",
                eventId: "groupMatchRaidSettings",
                raidSettings: request,
            } as any);
        }
    }

    /** Handle /client/match/available */
    public handleServerAvailable(sessionID: string): boolean {
        return true;
    }
}
