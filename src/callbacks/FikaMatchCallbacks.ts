import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { IRequestIdRequest } from "src/models/eft/match/IRequestIdRequest";
import { IProfileStatusRequest } from "src/models/eft/match/IProfileStatusRequest";
import { IMatchGroupTransferRequest } from "src/models/eft/match/IMatchGroupTransferRequest";
import { IMatchGroupPlayerRemoveRequest } from "src/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "src/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupInviteSendRequest } from "src/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupStatusRequest } from "src/models/eft/match/IMatchGroupStatusRequest";
import { FikaMatchController } from "src/controllers/FikaMatchController";

@injectable()
export class FikaMatchCallbacks {
    constructor(
        @inject("FikaMatchController") protected fikaMatchController: FikaMatchController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil
    ) {
        // empty
    }

    /** Handle /client/match/exit */
    // TODO: override AKI's to handle groups
    public handleMatchExit(url: string, info: any, sessionID: string): string {
        this.fikaMatchController.handleMatchExit(sessionID);
        return this.httpResponseUtil.getUnclearedBody(null);
    }

    /** Handle /client/match/group/current */
    // TODO: override AKI's to handle groups
    public handleMatchGroupCurrent(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupCurrent(sessionID));
    }

    /** Handle /client/match/group/delete */
    // TODO: override AKI's to handle groups
    public handleMatchGroupDelete(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupDelete(sessionID));
    }

    /** Handle /client/match/group/exit_from_menu */
    // TODO: override AKI's to handle groups
    public handleMatchGroupExitFromMenu(url: string, info: any, sessionID: string): string {
        this.fikaMatchController.handleMatchGroupExitFromMenu(sessionID);
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/invite/accept */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteAccept(url: string, info: IRequestIdRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupInviteAccept(info, sessionID));
    }

    /** Handle /client/match/group/invite/cancel */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteCancel(url: string, info: IRequestIdRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupInviteCancel(info, sessionID));
    }

    /** Handle /client/match/group/invite/cancel-all */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteCancelAll(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupInviteCancelAll(sessionID));
    }

    /** Handle /client/match/group/invite/decline */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteDecline(url: string, info: IRequestIdRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupInviteDecline(info, sessionID));
    }

    /** Handle /client/match/group/invite/send */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteSend(url: string, info: IMatchGroupInviteSendRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupInviteSend(info, sessionID));
    }

    /** Handle /client/match/group/leave */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLeave(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupLeave(sessionID));
    }

    /** Handle /client/match/group/looking/start */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLookingStart(url: string, info: any, sessionID: string): string {
        this.fikaMatchController.handleMatchGroupLookingStart(sessionID);
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/looking/stop */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLookingStop(url: string, info: any, sessionID: string): string {
        this.fikaMatchController.handleMatchGroupLookingStop(sessionID);
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/player/remove */
    // TODO: override AKI's to handle groups
    public handleMatchGroupPlayerRemove(url: string, info: IMatchGroupPlayerRemoveRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupPlayerRemove(info, sessionID));
    }

    /** Handle /client/match/group/start_game */
    // TODO: override AKI's to handle groups
    public handleMatchGroupStartGame(url: string, info: IMatchGroupStartGameRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupStartGame(info, sessionID));
    }

    /** Handle /client/match/group/status */
    // TODO: override AKI's to handle groups
    public handleMatchGroupStatus(url: string, info: IMatchGroupStatusRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupStatus(info, sessionID));
    }

    /** Handle /client/match/group/transfer */
    // TODO: override AKI's to handle groups
    public handleMatchGroupTransfer(url: string, info: IMatchGroupTransferRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupTransfer(info, sessionID));
    }

    /** Handle /client/match/group/raid/not-ready */
    public handleMatchGroupRaidNotReady(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupRaidNotReady(sessionID));
    }

    /** Handle /client/match/group/raid/ready */
    public handleMatchGroupRaidReady(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupRaidReady(sessionID));
    }

    /** Handle /client/profile/status */
    // TODO: override AKI's to handle groups
    public handleProfileStatus(url: string, info: IProfileStatusRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleProfileStatus(info, sessionID));
    }
}
