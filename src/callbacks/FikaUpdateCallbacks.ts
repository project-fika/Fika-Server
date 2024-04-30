import { inject, injectable } from "tsyringe";

import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { FikaUpdateController } from "../controllers/FikaUpdateController";
import { IFikaUpdatePingRequestData } from "../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSetStatusRequestData } from "../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { IFikaUpdateSethostRequestData } from "../models/fika/routes/update/IFikaUpdateSethostRequestData";
import { IFikaUpdateSpawnpointRequestData } from "../models/fika/routes/update/IFikaUpdateSpawnpointRequestData";

@injectable()
export class FikaUpdateCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaUpdateController") protected fikaUpdateController: FikaUpdateController,
    ) {
        // empty
    }

    /** Handle /fika/update/ping */
    public handlePing(_url: string, info: IFikaUpdatePingRequestData, _sessionID: string): INullResponseData {
        this.fikaUpdateController.handlePing(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/spawnpoint */
    public handleSpawnpoint(_url: string, info: IFikaUpdateSpawnpointRequestData, _sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSpawnpoint(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/playerspawn */
    public handlePlayerspawn(_url: string, info: IFikaUpdatePlayerspawnRequestData, _sessionID: string): INullResponseData {
        this.fikaUpdateController.handlePlayerspawn(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/sethost */
    public handleSethost(_url: string, info: IFikaUpdateSethostRequestData, _sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSethost(info);

        return this.httpResponseUtil.nullResponse();
    }

    /** Handle /fika/update/setstatus */
    public handleSetStatus(_url: string, info: IFikaUpdateSetStatusRequestData, _sessionID: string): INullResponseData {
        this.fikaUpdateController.handleSetStatus(info);

        return this.httpResponseUtil.nullResponse();
    }
}
