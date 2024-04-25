import { inject, injectable } from "tsyringe";

import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IFikaUpdatePingRequestData } from "../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSethostRequestData } from "../models/fika/routes/update/IFikaUpdateSethostRequestData";
import { IFikaUpdateSpawnpointRequestData } from "../models/fika/routes/update/IFikaUpdateSpawnpointRequestData";
import { IFikaUpdateSetStatusRequestData } from "../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { FikaUpdateController } from "../controllers/FikaUpdateController";

@injectable()
export class FikaUpdateCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaUpdateController") protected fikaUpdateController: FikaUpdateController
    ) {
        // empty
    }

    /** Handle /fika/update/ping */
    public handlePing(url: string, info: IFikaUpdatePingRequestData, sessionID: string): INullResponseData {
        this.fikaUpdateController.handlePing(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/spawnpoint */
    public handleSpawnpoint(url: string, info: IFikaUpdateSpawnpointRequestData, sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSpawnpoint(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/playerspawn */
    public handlePlayerspawn(url: string, info: IFikaUpdatePlayerspawnRequestData, sessionID: string): INullResponseData {
        this.fikaUpdateController.handlePlayerspawn(info)

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/sethost */
    public handleSethost(url: string, info: IFikaUpdateSethostRequestData, sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSethost(info)

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/setstatus */
    public handleSetStatus(url: string, info: IFikaUpdateSetStatusRequestData, sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSetStatus(info)

        return this.httpResponseUtil.nullResponse();
    }
}
