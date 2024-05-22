import { inject, injectable } from "tsyringe";

import { IProfileStatusRequest } from "@spt/models/eft/match/IProfileStatusRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaMatchController } from "../controllers/FikaMatchController";

@injectable()
export class FikaMatchCallbacks {
    constructor(
        @inject("FikaMatchController") protected fikaMatchController: FikaMatchController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
    ) {
        // empty
    }

    /** Handle /client/match/group/current */
    // GameCallbacks
    // TODO: override SPT's to handle groups
    public handleMatchGroupCurrent(_url: string, _info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupCurrent(sessionID));
    }

    /** Handle /client/match/group/raid/not-ready */
    public handleMatchGroupRaidNotReady(_url: string, _info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupRaidNotReady(sessionID));
    }

    /** Handle /client/match/group/raid/ready */
    public handleMatchGroupRaidReady(_url: string, _info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupRaidReady(sessionID));
    }

    /** Handle /client/profile/status */
    // ProfileCallbacks
    // TODO: override SPT's to handle groups
    public handleProfileStatus(_url: string, info: IProfileStatusRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleProfileStatus(info, sessionID));
    }
}
