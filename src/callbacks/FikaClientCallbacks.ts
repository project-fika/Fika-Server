import { inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaClientController } from "../controllers/FikaClientController";
import { IFikaCheckModRequestData } from "../models/fika/routes/client/check/IFikaCheckModRequestData";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";

@injectable()
export class FikaClientCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaClientController") protected fikaClientController: FikaClientController,
    ) {
        // empty
    }

    /** Handle /fika/client/config */
    public handleClientConfig(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleClientConfig());
    }

    /** Handle /fika/client/config */
    public handleNatPunchServerConfig(_url: string, _info: IFikaRaidServerIdRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleNatPunchServerConfig());
    }

    /** Handle /fika/client/check/mods */
    public handleCheckMods(_url: string, info: IFikaCheckModRequestData, _sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleCheckMods(info));
    }

    /** Handle /fika/profile/download */
    public handleProfileDownload(_url: string, _info: any, sessionID: string): any {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleProfileDownload(sessionID));
    }

    /** Handle /fika/client/check/version */
    public handleVersionCheck(_url: string, _info: any, _sessionID: string): any {
        return this.httpResponseUtil.noBody(this.fikaClientController.handleVersionCheck());
    }
}
