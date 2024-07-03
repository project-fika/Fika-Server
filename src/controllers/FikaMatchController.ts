import { inject, injectable } from "tsyringe";

import { ApplicationContext } from "@spt/context/ApplicationContext";
import { MatchController } from "@spt/controllers/MatchController";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { MailSendService } from "@spt/services/MailSendService";
import { MatchLocationService } from "@spt/services/MatchLocationService";
import { ProfileSnapshotService } from "@spt/services/ProfileSnapshotService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { IMatchGroupInviteSendRequest } from "@spt/models/eft/match/IMatchGroupInviteSendRequest";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IRequestIdRequest } from "@spt/models/eft/match/IRequestIdRequest";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupTransferRequest } from "@spt/models/eft/match/IMatchGroupTransferRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { FikaGroupService } from "../services/FikaGroupService";

@injectable()
export class FikaMatchController extends MatchController {
    constructor(
        @inject("PrimaryLogger") protected logger: ILogger,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("MailSendService") protected mailSendService: MailSendService,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("MatchLocationService") protected matchLocationService: MatchLocationService,
        @inject("TraderHelper") protected traderHelper: TraderHelper,
        @inject("BotLootCacheService") protected botLootCacheService: BotLootCacheService,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("ProfileSnapshotService") protected profileSnapshotService: ProfileSnapshotService,
        @inject("BotGenerationCacheService") protected botGenerationCacheService: BotGenerationCacheService,
        @inject("LootGenerator") protected lootGenerator: LootGenerator,
        @inject("ApplicationContext") protected applicationContext: ApplicationContext,
        @inject("NotificationSendHelper") protected notifications: NotificationSendHelper,
        @inject("FikaGroupService") protected groupService: FikaGroupService,
    ) {
        super(logger, saveServer, mailSendService, timeUtil, randomUtil, hashUtil,
            profileHelper, matchLocationService, traderHelper, botLootCacheService, configServer,
            profileSnapshotService, botGenerationCacheService, lootGenerator, applicationContext
        );
    }

    /**
     * Handle client/match/group/invite/send
     * @param info Sender & receipient info
     * @param sessionID Player's session ID
     * @returns {string} Invite's request ID
     */
    public sendGroupInvite(info: IMatchGroupInviteSendRequest, sessionID: string): string {
        const recipient = Object.values(this.saveServer.getProfiles()).find(p => p.info.aid.toString() === info.to.toString())
        return this.groupService.sendInvite(recipient.info.id, sessionID, info.inLobby);
    }

    /**
     * Handle client/match/group/invite/decline
     * @param info Invite's request ID
     * @param sessionID Player's session ID
     * @returns
     */
    public acceptGroupInvite(info: IRequestIdRequest, sessionID: string): IGroupCharacter[] {
        return this.groupService.acceptInvite(info.requestId, sessionID);
    }

    /**
     * Handle client/match/group/invite/decline
     * @param info Invite's request ID
     * @param sessionID Player's session ID
     * @returns
     */
    public declineGroupInvite(info: IRequestIdRequest, sessionID: string): boolean {
        return this.groupService.declineInvite(info.requestId, sessionID);
    }

    /**
     * Handle client/match/group/invite/cancel
     * @param info Invite's request ID
     * @param sessionID Player's session ID
     * @returns
     */
    public cancelGroupInvite(info: IRequestIdRequest, sessionID: string): boolean {
        return this.groupService.cancelInvite(info.requestId);
    }

    /**
     * Handle client/match/group/invite/cancel-all
     * @param info ignored
     * @param sessionID Player's session ID
     * @returns
     */
    public cancelAllGroupInvite(info: IEmptyRequestData, sessionID: string): boolean {
        const groupId = this.groupService.getGroupIdByMember(sessionID);
        return this.groupService.cancelAllInvites(groupId, sessionID);
    }

    /**
     *  Handle client/match/group/transfer
     * @param info
     * @param sessionID Player's session ID
     * @returns {boolean}
     */
    public transferGroup(info: IMatchGroupTransferRequest, sessionID: string): boolean {
        const groupId = this.groupService.getGroupIdByMember(sessionID);
        const profile = Object.values(this.saveServer.getProfiles()).find(p => String(p.info.aid) === info.aidToChange);
        return this.groupService.transferGroup(groupId, sessionID, profile?.info?.id);
    }

    /**
     * Handle client/match/group/player/remove
     * @param info ignored
     * @param sessionID Player's session ID
     * @returns
     */
    public leaveGroup(info: IEmptyRequestData, sessionID: string): boolean {
        const groupId = this.groupService.getGroupIdByMember(sessionID);
        return !!this.groupService.leaveGroup(groupId, sessionID);
    }

    /**
     * Handle client/match/group/player/remove
     * @param info
     * @param sessionID Player's session ID
     * @returns
     */
    public removePlayerFromGroup(info: IMatchGroupPlayerRemoveRequest, sessionID: string): boolean {
        const groupId = this.groupService.getGroupIdByMember(sessionID);
        const profile = Object.values(this.saveServer.getProfiles()).find(p => String(p.info.aid) === info.aidToKick)
        return !!this.groupService.kickPlayer(groupId, sessionID, profile?.info?.id);
    }

    /**
     * Handle client/match/group/current
     * @param info ignored
     * @param sessionID Player's session ID
     * @returns
     */
    public groupCurrent(info: IEmptyRequestData, sessionID: string): IMatchGroupCurrentResponse {
        const group = this.groupService.getGroupByMember(sessionID);
        return { squad: group ?? [] }
    }

    /**
     * Handle /client/raid/configuration
     * @param request Raid config request
     * @param sessionID Player's session ID
     */
    public startOfflineRaid = (request: IGetRaidConfigurationRequestData, sessionID: string) => {
        super.startOfflineRaid(request, sessionID);

        const groupId = this.groupService.getGroupIdByMember(sessionID);
        if (groupId) {
            this.groupService.sendRaidSettings(groupId, request);
        }
    }
}
