import { MatchController } from "@spt-aki/controllers/MatchController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IAcceptGroupInviteRequest } from "@spt-aki/models/eft/match/IAcceptGroupInviteRequest";
import { IAcceptGroupInviteResponse } from "@spt-aki/models/eft/match/IAcceptGroupInviteResponse";
import { ICancelGroupInviteRequest } from "@spt-aki/models/eft/match/ICancelGroupInviteRequest";
import { IDeclineGroupInviteRequest } from "@spt-aki/models/eft/match/IDeclineGroupInviteRequest";
import { IEndOfflineRaidRequestData } from "@spt-aki/models/eft/match/IEndOfflineRaidRequestData";
import { IGetGroupStatusRequestData } from "@spt-aki/models/eft/match/IGetGroupStatusRequestData";
import { IGetGroupStatusResponse } from "@spt-aki/models/eft/match/IGetGroupStatusResponse";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { IJoinMatchRequestData } from "@spt-aki/models/eft/match/IJoinMatchRequestData";
import { IJoinMatchResult } from "@spt-aki/models/eft/match/IJoinMatchResult";
import { IPutMetricsRequestData } from "@spt-aki/models/eft/match/IPutMetricsRequestData";
import { IRemovePlayerFromGroupRequest } from "@spt-aki/models/eft/match/IRemovePlayerFromGroupRequest";
import { ISendGroupInviteRequest } from "@spt-aki/models/eft/match/ISendGroupInviteRequest";
import { ITransferGroupRequest } from "@spt-aki/models/eft/match/ITransferGroupRequest";
import { IUpdatePingRequestData } from "@spt-aki/models/eft/match/IUpdatePingRequestData";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class MatchCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected matchController: MatchController;
    protected databaseServer: DatabaseServer;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, matchController: MatchController, databaseServer: DatabaseServer);
    /** Handle client/match/updatePing */
    updatePing(url: string, info: IUpdatePingRequestData, sessionID: string): INullResponseData;
    exitMatch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/exit_from_menu */
    exitToMenu(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    startGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    stopGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/invite/send */
    sendGroupInvite(url: string, info: ISendGroupInviteRequest, sessionID: string): IGetBodyResponseData<string>;
    /** Handle client/match/group/invite/accept */
    acceptGroupInvite(url: string, info: IAcceptGroupInviteRequest, sessionID: string): IGetBodyResponseData<IAcceptGroupInviteResponse[]>;
    /** Handle client/match/group/invite/decline */
    declineGroupInvite(url: string, info: IDeclineGroupInviteRequest, sessionID: string): IGetBodyResponseData<any>;
    /** Handle client/match/group/invite/cancel */
    cancelGroupInvite(url: string, info: ICancelGroupInviteRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/transfer */
    transferGroup(url: string, info: ITransferGroupRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/invite/cancel-all */
    cancelAllGroupInvite(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** @deprecated - not called on raid start/end or game start/exit */
    putMetrics(url: string, info: IPutMetricsRequestData, sessionID: string): INullResponseData;
    serverAvailable(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle match/group/start_game */
    joinMatch(url: string, info: IJoinMatchRequestData, sessionID: string): IGetBodyResponseData<IJoinMatchResult>;
    /** Handle client/getMetricsConfig */
    getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    getGroupStatus(url: string, info: IGetGroupStatusRequestData, sessionID: string): IGetBodyResponseData<IGetGroupStatusResponse>;
    /** Handle client/match/group/delete */
    deleteGroup(url: string, info: any, sessionID: string): INullResponseData;
    leaveGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/player/remove */
    removePlayerFromGroup(url: string, info: IRemovePlayerFromGroupRequest, sessionID: string): INullResponseData;
    /** Handle client/match/offline/end */
    endOfflineRaid(url: string, info: IEndOfflineRaidRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration */
    getRaidConfiguration(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration-by-profile */
    getConfigurationByProfile(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
}
