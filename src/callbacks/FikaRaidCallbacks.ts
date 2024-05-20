import { inject, injectable } from "tsyringe";

import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { FikaRaidController } from "../controllers/FikaRaidController";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidJoinRequestData } from "../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidLeaveRequestData } from "../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";

@injectable()
export class FikaRaidCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaRaidController") protected fikaRaidController: FikaRaidController,
    ) {
        // empty
    }

    /** Handle /fika/raid/create */
    public handleRaidCreate(_url: string, info: IFikaRaidCreateRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidCreate(info));
    }

    /** Handle /fika/raid/join */
    public handleRaidJoin(_url: string, info: IFikaRaidJoinRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidJoin(info));
    }

    /** Handle /fika/raid/leave */
    public handleRaidLeave(_url: string, info: IFikaRaidLeaveRequestData, _sessionID: string): INullResponseData {
        this.fikaRaidController.handleRaidLeave(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/raid/gethost */
    public handleRaidGethost(_url: string, info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidGethost(info));
    }

    /** Handle /fika/raid/spawnpoint */
    public handleRaidSpawnpoint(_url: string, info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidSpawnpoint(info));
    }

    /** Handle /fika/raid/getsettings */
    public handleRaidGetSettings(_url: string, info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaRaidController.handleRaidGetSettings(info));
    }
}
