import { DependencyContainer, inject, injectable } from "tsyringe";

import { MatchCallbacks } from "@spt-aki/callbacks/MatchCallbacks";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { ITransferGroupRequest } from "@spt-aki/models/eft/match/ITransferGroupRequest";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IMatchGroupInviteSendRequest } from "../../models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "../../models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "../../models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "../../models/eft/match/IMatchGroupStatusRequest";
import { IRequestIdRequest } from "../../models/eft/match/IRequestIdRequest";

import { FikaMatchController } from "../../controllers/FikaMatchController";
import { Override } from "../../di/Override";

@injectable()
export class MatchCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaMatchController") protected fikaMatchController: FikaMatchController,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "MatchCallbacks",
            (_t, result: MatchCallbacks) => {
                /** Handle /client/match/exit */
                result.exitMatch = (_url: string, _info: IEmptyRequestData, sessionID: string): INullResponseData => {
                    this.fikaMatchController.handleMatchExit(sessionID);
                    return this.httpResponseUtil.nullResponse();
                };

                /** Handle /client/match/group/exit_from_menu */
                result.exitToMenu = (_url: string, _info: IEmptyRequestData, sessionID: string): INullResponseData => {
                    this.fikaMatchController.handleMatchGroupExitFromMenu(sessionID);
                    return this.httpResponseUtil.nullResponse();
                };

                /** Handle /client/match/group/invite/accept */
                result.acceptGroupInvite = (_url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteAccept(info, sessionID));
                };

                /** Handle /client/match/group/invite/cancel */
                result.cancelGroupInvite = (_url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteCancel(info, sessionID));
                };

                /** Handle /client/match/group/invite/cancel-all */
                result.cancelAllGroupInvite = (_url: string, _info: IEmptyRequestData, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteCancelAll(sessionID));
                };

                /** Handle /client/match/group/invite/decline */
                result.declineGroupInvite = (_url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteDecline(info, sessionID));
                };

                /** Handle /client/match/group/invite/send */
                result.sendGroupInvite = (_url: string, info: IMatchGroupInviteSendRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteSend(info, sessionID));
                };

                /** Handle /client/match/group/leave */
                result.leaveGroup = (_url: string, _info: IEmptyRequestData, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupLeave(sessionID));
                };

                /** Handle /client/match/group/delete */
                result.deleteGroup = (_url: string, _info: IEmptyRequestData, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupDelete(sessionID));
                };

                /** Handle /client/match/group/looking/start */
                result.startGroupSearch = (_url: string, _info: IEmptyRequestData, sessionID: string): INullResponseData => {
                    this.fikaMatchController.handleMatchGroupLookingStart(sessionID);
                    return this.httpResponseUtil.nullResponse();
                };

                /** Handle /client/match/group/looking/stop */
                result.stopGroupSearch = (_url: string, _info: IEmptyRequestData, sessionID: string): INullResponseData => {
                    this.fikaMatchController.handleMatchGroupLookingStop(sessionID);
                    return this.httpResponseUtil.nullResponse();
                };

                /** Handle /client/match/group/player/remove */
                result.removePlayerFromGroup = (_url: string, info: IMatchGroupPlayerRemoveRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupPlayerRemove(info, sessionID));
                };

                /** Handle /client/match/group/transfer */
                result.transferGroup = (_url: string, info: ITransferGroupRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupTransfer(info, sessionID));
                };

                /** Handle /client/match/group/start_game */
                result.joinMatch = (_url: string, info: IMatchGroupStartGameRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupStartGame(info, sessionID));
                };

                /** Handle /client/match/group/status */
                result.getGroupStatus = (_url: string, info: IMatchGroupStatusRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupStatus(info, sessionID));
                };
            },
            { frequency: "Always" },
        );
    }
}
