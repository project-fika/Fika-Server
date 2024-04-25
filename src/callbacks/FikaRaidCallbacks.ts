import { inject, injectable } from "tsyringe";

import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidJoinRequestData } from "../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidLeaveRequestData } from "../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { FikaRaidController } from "../controllers/FikaRaidController";

@injectable()
export class FikaRaidCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaRaidController") protected fikaRaidController: FikaRaidController
    ) {
        // empty
    }

    /** Handle /fika/raid/create */
    public handleRaidCreate(url: string, info: IFikaRaidCreateRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidCreate(info));
    }

    /** Handle /fika/raid/join */
    public handleRaidJoin(url: string, info: IFikaRaidJoinRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidJoin(info));
    }

    /** Handle /fika/raid/leave */
    public handleRaidLeave(url: string, info: IFikaRaidLeaveRequestData, sessionID: string): INullResponseData {
        this.fikaRaidController.handleRaidLeave(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/raid/gethost */
    public handleRaidGethost(url: string, info: IFikaRaidServerIdRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidGethost(info));
    }

    /** Handle /fika/raid/spawnpoint */
    public handleRaidSpawnpoint(url: string, info: IFikaRaidServerIdRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidSpawnpoint(info));
    }
}
