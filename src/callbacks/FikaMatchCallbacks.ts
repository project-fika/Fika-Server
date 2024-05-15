import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { IRequestIdRequest } from "src/models/eft/match/IRequestIdRequest";
import { IGroupCharacter } from "src/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "src/models/eft/match/IMatchGroupCurrentResponse";
import { IProfileStatusResponse } from "src/models/eft/match/IProfileStatusResponse";
import { IProfileStatusRequest } from "src/models/eft/match/IProfileStatusRequest";
import { IMatchGroupTransferRequest } from "src/models/eft/match/IMatchGroupTransferRequest";
import { IMatchGroupPlayerRemoveRequest } from "src/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "src/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupInviteSendRequest } from "src/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupStatusRequest } from "src/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "src/models/eft/match/IMatchGroupStatusResponse";

@injectable()
export class FikaMatchCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil
    ) {
        // empty
    }

    /** Handle /client/match/exit */
    // TODO: override AKI's to handle groups
    public handleMatchExit(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(null);
    }

    /** Handle /client/match/group/current */
    // TODO: override AKI's to handle groups
    public handleMatchGroupCurrent(_url: string, _info: any, _sessionID: string): string {
        const data: IMatchGroupCurrentResponse = {
            squad: []
        };

        return this.httpResponseUtil.getUnclearedBody(data);
    }

    /** Handle /client/match/group/delete */
    // TODO: override AKI's to handle groups
    public handleMatchGroupDelete(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/exit_from_menu */
    // TODO: override AKI's to handle groups
    public handleMatchGroupExitFromMenu(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/invite/accept */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteAccept(_url: string, _info: IRequestIdRequest, _sessionID: string): string {
        const data: IGroupCharacter[] = [];

        return this.httpResponseUtil.noBody(data);
    }

    /** Handle /client/match/group/invite/cancel */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteCancel(_url: string, _info: IRequestIdRequest, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/invite/cancel-all */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteCancelAll(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/invite/decline */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteDecline(_url: string, _info: IRequestIdRequest, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/invite/send */
    // TODO: override AKI's to handle groups
    public handleMatchGroupInviteSend(_url: string, _info: IMatchGroupInviteSendRequest, _sessionID: string): string {
        // TODO: proper groupId
        const groupId = "000000000000000000000000";

        return this.httpResponseUtil.getUnclearedBody(groupId);
    }

    /** Handle /client/match/group/leave */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLeave(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/looking/start */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLookingStart(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/looking/stop */
    // TODO: override AKI's to handle groups
    public handleMatchGroupLookingStop(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.noBody(null);
    }

    /** Handle /client/match/group/player/remove */
    // TODO: override AKI's to handle groups
    public handleMatchGroupPlayerRemove(_url: string, _info: IMatchGroupPlayerRemoveRequest, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/start_game */
    // TODO: override AKI's to handle groups
    public handleMatchGroupStartGame(_url: string, _info: IMatchGroupStartGameRequest, _sessionID: string): string {
        // NOTE: not entirely clear when `ip`, `port`, `sid`, `shortId` are set
        const data: IProfileStatusResponse = {
            maxPveCountExceeded: false,
            profiles: [
                // of all active characters in the group
            ]
        };

        return this.httpResponseUtil.getUnclearedBody(data);
    }

    /** Handle /client/match/group/status */
    // TODO: override AKI's to handle groups
    public handleMatchGroupStatus(_url: string, _info: IMatchGroupStatusRequest, _sessionID: string): string {
        const data: IMatchGroupStatusResponse = {
            players: [],
            maxPveCountExceeded: false
        };

        return this.httpResponseUtil.getUnclearedBody(data);
    }

    /** Handle /client/match/group/transfer */
    // TODO: override AKI's to handle groups
    public handleMatchGroupTransfer(_url: string, _info: IMatchGroupTransferRequest, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/raid/not-ready */
    public handleMatchGroupRaidNotReady(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/match/group/raid/ready */
    public handleMatchGroupRaidReady(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(true);
    }

    /** Handle /client/profile/status */
    // TODO: override AKI's to handle groups
    public handleProfileStatus(_url: string, _info: IProfileStatusRequest, _sessionID: string): string {
        const data: IProfileStatusResponse = {
            maxPveCountExceeded: false,
            profiles: [
                // requesting player's
                // - scav
                // - pmc
            ]
        };

        return this.httpResponseUtil.noBody(null);
    }
}
