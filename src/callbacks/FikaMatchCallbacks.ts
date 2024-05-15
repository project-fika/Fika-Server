import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { IProfileStatusRequest } from "src/models/eft/match/IProfileStatusRequest";
import { FikaMatchController } from "src/controllers/FikaMatchController";

@injectable()
export class FikaMatchCallbacks {
    constructor(
        @inject("FikaMatchController") protected fikaMatchController: FikaMatchController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil
    ) {
        // empty
    }

    /** Handle /client/match/group/current */
    // GameCallbacks
    // TODO: override AKI's to handle groups
    public handleMatchGroupCurrent(url: string, info: any, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleMatchGroupCurrent(sessionID));
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
    // ProfileCallbacks
    // TODO: override AKI's to handle groups
    public handleProfileStatus(url: string, info: IProfileStatusRequest, sessionID: string): string {
        return this.httpResponseUtil.getUnclearedBody(this.fikaMatchController.handleProfileStatus(info, sessionID));
    }
}
