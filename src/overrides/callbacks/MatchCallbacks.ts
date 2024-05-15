import { DependencyContainer, inject, injectable } from "tsyringe";

import { MatchCallbacks } from "@spt-aki/callbacks/MatchCallbacks";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IRequestIdRequest } from "src/models/eft/match/IRequestIdRequest";
import { IMatchGroupTransferRequest } from "src/models/eft/match/IMatchGroupTransferRequest";
import { IMatchGroupPlayerRemoveRequest } from "src/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupInviteSendRequest } from "src/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupStatusRequest } from "src/models/eft/match/IMatchGroupStatusRequest";
import { FikaMatchController } from "src/controllers/FikaMatchController";

import { Override } from "../../di/Override";
import { IMatchGroupStartGameRequest } from "src/models/eft/match/IMatchGroupStartGameRequest";

@injectable()
export class MatchCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaMatchController") protected fikaMatchController: FikaMatchController,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution("MatchCallbacks",
        (_t, result: MatchCallbacks) => {
                result.c

                /** Handle /client/match/exit */
                result.exitMatch = (url: string, info: any, sessionID: string) => {
                    this.fikaMatchController.handleMatchExit(sessionID);
                    return this.httpResponseUtil.nullResponse();
                }
                /** Handle /client/match/group/exit_from_menu */
                result.exitToMenu = (url: string, info: any, sessionID: string) => {
                    this.fikaMatchController.handleMatchGroupExitFromMenu(sessionID);
                    return this.httpResponseUtil.nullResponse();
                }

                /** Handle /client/match/group/invite/accept */
                result.acceptGroupInvite = (url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteAccept(info, sessionID));
                }

                /** Handle /client/match/group/invite/cancel */
                result.cancelGroupInvite = (url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteCancel(info, sessionID));
                }

                /** Handle /client/match/group/invite/cancel-all */
                result.cancelAllGroupInvite = (url: string, info: any, sessionID: string): => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteCancelAll(sessionID));
                }

                /** Handle /client/match/group/invite/decline */
                result.declineGroupInvite = (url: string, info: IRequestIdRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteDecline(info, sessionID));
                }

                /** Handle /client/match/group/invite/send */
                result.sendGroupInvite = (url: string, info: IMatchGroupInviteSendRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupInviteSend(info, sessionID));
                }

                /** Handle /client/match/group/leave */
                result.leaveGroup = (url: string, info: any, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupLeave(sessionID));
                }

                /** Handle /client/match/group/delete */
                result.deleteGroup = (url: string, info: any, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupDelete(sessionID));
                }

                /** Handle /client/match/group/looking/start */
                result.startGroupSearch = (url: string, info: any, sessionID: string) => {
                    this.fikaMatchController.handleMatchGroupLookingStart(sessionID);
                    return this.httpResponseUtil.nullResponse();
                }

                /** Handle /client/match/group/looking/stop */
                result.stopGroupSearch = (url: string, info: any, sessionID: string) =>{
                    this.fikaMatchController.handleMatchGroupLookingStop(sessionID);
                    return this.httpResponseUtil.nullResponse();
                }

                /** Handle /client/match/group/player/remove */
                result.removePlayerFromGroup = (url: string, info: IMatchGroupPlayerRemoveRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupPlayerRemove(info, sessionID));
                }

                /** Handle /client/match/group/transfer */
                result.transferGroup = (url: string, info: IMatchGroupTransferRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupTransfer(info, sessionID));
                }

                /** Handle /client/match/group/start_game */
                result.joinMatch = (url: string, info: IMatchGroupStartGameRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupStartGame(info, sessionID));
                }

                /** Handle /client/match/group/status */
                result.getGroupStatus = (url: string, info: IMatchGroupStatusRequest, sessionID: string) => {
                    return this.httpResponseUtil.getBody(this.fikaMatchController.handleMatchGroupStatus(info, sessionID));
                }
            },
            { frequency: "Always" },
        );
    }
}
