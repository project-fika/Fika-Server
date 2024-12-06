import { MatchController } from "@spt/controllers/MatchController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMetrics } from "@spt/models/eft/common/tables/IMatch";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupInviteSendRequest } from "@spt/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IMatchGroupTransferRequest } from "@spt/models/eft/match/IMatchGroupTransferRequest";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IPutMetricsRequestData } from "@spt/models/eft/match/IPutMetricsRequestData";
import { IRequestIdRequest } from "@spt/models/eft/match/IRequestIdRequest";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { IUpdatePingRequestData } from "@spt/models/eft/match/IUpdatePingRequestData";
import { DatabaseService } from "@spt/services/DatabaseService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class MatchCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected matchController: MatchController;
    protected databaseService: DatabaseService;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, matchController: MatchController, databaseService: DatabaseService);
    /** Handle client/match/updatePing */
    updatePing(url: string, info: IUpdatePingRequestData, sessionID: string): INullResponseData;
    exitMatch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/exit_from_menu */
    exitFromMenu(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/current */
    groupCurrent(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IMatchGroupCurrentResponse>;
    /** Handle client/match/group/looking/start */
    startGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/looking/stop */
    stopGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/invite/send */
    sendGroupInvite(url: string, info: IMatchGroupInviteSendRequest, sessionID: string): IGetBodyResponseData<string>;
    /** Handle client/match/group/invite/accept */
    acceptGroupInvite(url: string, info: IRequestIdRequest, sessionId: string): IGetBodyResponseData<IGroupCharacter[]>;
    /** Handle client/match/group/invite/decline */
    declineGroupInvite(url: string, info: IRequestIdRequest, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/invite/cancel */
    cancelGroupInvite(url: string, info: IRequestIdRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/transfer */
    transferGroup(url: string, info: IMatchGroupTransferRequest, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/invite/cancel-all */
    cancelAllGroupInvite(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/putMetrics */
    putMetrics(url: string, request: IPutMetricsRequestData, sessionId: string): INullResponseData;
    /** Handle client/analytics/event-disconnect */
    eventDisconnect(url: string, request: IPutMetricsRequestData, sessionId: string): INullResponseData;
    serverAvailable(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle match/group/start_game */
    joinMatch(url: string, info: IMatchGroupStartGameRequest, sessionID: string): IGetBodyResponseData<IProfileStatusResponse>;
    /** Handle client/getMetricsConfig */
    getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<IMetrics>;
    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    getGroupStatus(url: string, info: IMatchGroupStatusRequest, sessionID: string): IGetBodyResponseData<IMatchGroupStatusResponse>;
    /** Handle client/match/group/delete */
    deleteGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    leaveGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/player/remove */
    removePlayerFromGroup(url: string, info: IMatchGroupPlayerRemoveRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/local/start */
    startLocalRaid(url: string, info: IStartLocalRaidRequestData, sessionID: string): IGetBodyResponseData<IStartLocalRaidResponseData>;
    /** Handle client/match/local/end */
    endLocalRaid(url: string, info: IEndLocalRaidRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration */
    getRaidConfiguration(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration-by-profile */
    getConfigurationByProfile(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/raid/ready */
    raidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/raid/not-ready */
    notRaidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
}
