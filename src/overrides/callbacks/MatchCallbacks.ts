import { DependencyContainer, inject, injectable } from "tsyringe";

import { MatchCallbacks } from "@spt/callbacks/MatchCallbacks";
import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IWsAid } from "@spt/models/eft/ws/IWsAid";
import { IWsGroupMatchRaidReady } from "@spt/models/eft/ws/IWsGroupMatchRaidReady";
import { NotificationEventType } from "@spt/models/enums/NotificationEventType";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { Override } from "../../di/Override";
import { FikaGroupService } from "../../services/FikaGroupService";
import { FikaMatchService } from "../../services/FikaMatchService";

@injectable()
export class MatchCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("FikaGroupService") protected fikaGroupService: FikaGroupService,
        @inject("NotificationSendHelper") protected notifications: NotificationSendHelper,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "MatchCallbacks",
            (_t, result: MatchCallbacks) => {
                /** Handle client/match/raid/ready */
                result.raidReady = (url: string, info: IEmptyRequestData, sessionId: string) => {
                    this.logger.info(`Raid ready: ${sessionId}`)
                    const groupId = this.fikaGroupService.getGroupIdByMember(sessionId);
                    const group = this.fikaGroupService.groupMemberReady(groupId, sessionId);
                    const readyMember = this.fikaGroupService.getGroupMember(groupId, sessionId);

                    if (group && readyMember) {
                        for (const member of group) {
                            if (member._id === sessionId) continue;

                            this.notifications.sendMessage(member._id, {
                                type: NotificationEventType.GROUP_MATCH_RAID_READY,
                                eventId: this.hashUtil.generate(),
                                extendedProfile: readyMember
                            } as IWsGroupMatchRaidReady);
                        }
                    }

                    return this.httpResponseUtil.getBody(true);
                }

                /** Handle client/match/raid/not-ready */
                result.notRaidReady = (url: string, info: IEmptyRequestData, sessionId: string) => {
                    const profile = this.saveServer.getProfile(sessionId);
                    const groupId = this.fikaGroupService.getGroupIdByMember(sessionId);
                    const group = this.fikaGroupService.groupMemberNotReady(groupId, sessionId);
                    const unreadyMember = this.fikaGroupService.getGroupMember(groupId, sessionId);
                    const leader = this.fikaGroupService.getGroupLeader(groupId);

                    if (!leader || !group || !group.length) {
                        return this.httpResponseUtil.getBody(true);
                    }

                    // leader has unreadied
                    const leaderUnreadied = unreadyMember?._id === leader?._id

                    if (sessionId === leader._id) {
                        this.fikaMatchService.deleteMatch(sessionId);
                    }

                    const notification: IWsAid = {
                        type: NotificationEventType.GROUP_MATCH_RAID_NOT_READY,
                        eventId: this.hashUtil.generate(),
                        aid: profile.info.aid
                    }

                    // If the leader is ready, then we'll notify everyone that this
                    // player isn't anymore.
                    if (leaderUnreadied || leader.IsReady) {
                        for (const member of group) {
                            this.notifications.sendMessage(member._id, notification);
                        }
                        return this.httpResponseUtil.getBody(true);
                    }

                    // If leader unreadied, then we'll make everyone un-ready
                    if (leaderUnreadied) {
                        for (const member of group) {
                            this.fikaGroupService.groupMemberNotReady(groupId, member._id);

                            if (member._id === leader._id || !member.IsReady) continue
                            this.notifications.sendMessage(leader._id, {
                                type: NotificationEventType.GROUP_MATCH_RAID_NOT_READY,
                                eventId: this.hashUtil.generate(),
                                aid: member.aid
                            } as IWsAid);
                        }
                    }

                    return this.httpResponseUtil.getBody(true);
                }

                /** Handle client/match/group/status */
                result.getGroupStatus = (url: string, info: IMatchGroupStatusRequest, sessionID: string) => {
                    const groupId = this.fikaGroupService.getGroupIdByMember(sessionID)
                    const group = this.fikaGroupService.getGroup(groupId);

                    return this.httpResponseUtil.getBody({
                        players: group,
                        maxPveCountExceeded: false
                    });
                }

                /** Handle client/match/group/delete */
                result.deleteGroup = (url: string, info: IEmptyRequestData, sessionId: string) => {
                    const groupId = this.fikaGroupService.getGroupIdByMember(sessionId);
                    const leader = this.fikaGroupService.getGroupLeader(groupId);

                    if (sessionId !== leader?._id) {
                        return this.httpResponseUtil.getBody(false);
                    }

                    const result = this.fikaGroupService.disbandGroup(groupId);
                    return this.httpResponseUtil.getBody(result);
                }
            },
            { frequency: "Always" },
        );
    }
}
