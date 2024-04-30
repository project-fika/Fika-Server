import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";

import { FikaUpdateCallbacks } from "../../callbacks/FikaUpdateCallbacks";
import { IFikaUpdatePingRequestData } from "../../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSetStatusRequestData } from "../../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { IFikaUpdateSethostRequestData } from "../../models/fika/routes/update/IFikaUpdateSethostRequestData";
import { IFikaUpdateSpawnpointRequestData } from "../../models/fika/routes/update/IFikaUpdateSpawnpointRequestData";

@injectable()
export class FikaUpdateStaticRouter extends StaticRouter {
    constructor(@inject("FikaUpdateCallbacks") protected fikaUpdateCallbacks: FikaUpdateCallbacks) {
        super([
            new RouteAction("/fika/update/ping", (url: string, info: IFikaUpdatePingRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaUpdateCallbacks.handlePing(url, info, sessionID);
            }),
            new RouteAction("/fika/update/spawnpoint", (url: string, info: IFikaUpdateSpawnpointRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaUpdateCallbacks.handleSpawnpoint(url, info, sessionID);
            }),
            new RouteAction("/fika/update/playerspawn", (url: string, info: IFikaUpdatePlayerspawnRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaUpdateCallbacks.handlePlayerspawn(url, info, sessionID);
            }),
            new RouteAction("/fika/update/sethost", (url: string, info: IFikaUpdateSethostRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaUpdateCallbacks.handleSethost(url, info, sessionID);
            }),
            new RouteAction("/fika/update/setstatus", (url: string, info: IFikaUpdateSetStatusRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaUpdateCallbacks.handleSetStatus(url, info, sessionID);
            }),
        ]);
    }
}
