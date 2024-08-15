import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";

import { FikaUpdateCallbacks } from "../../callbacks/FikaUpdateCallbacks";
import { IFikaUpdateRaidAddPlayerData as IFikaUpdateAddPlayerData } from "../../models/fika/routes/raid/join/IFikaRaidAddPlayerData";
import { IFikaUpdatePingRequestData } from "../../models/fika/routes/update/IFikaUpdatePingRequestData";
import { IFikaUpdatePlayerspawnRequestData } from "../../models/fika/routes/update/IFikaUpdatePlayerspawnRequestData";
import { IFikaUpdateSetStatusRequestData } from "../../models/fika/routes/update/IFikaUpdateSetStatusRequestData";
import { IFikaUpdateSethostRequestData } from "../../models/fika/routes/update/IFikaUpdateSethostRequestData";

@injectable()
export class FikaUpdateStaticRouter extends StaticRouter {
    constructor(@inject("FikaUpdateCallbacks") protected fikaUpdateCallbacks: FikaUpdateCallbacks) {
        super([
            new RouteAction("/fika/update/ping", async (url: string, info: IFikaUpdatePingRequestData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handlePing(url, info, sessionID);
            }),
            new RouteAction("/fika/update/playerspawn", async (url: string, info: IFikaUpdatePlayerspawnRequestData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handlePlayerspawn(url, info, sessionID);
            }),
            new RouteAction("/fika/update/sethost", async (url: string, info: IFikaUpdateSethostRequestData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handleSethost(url, info, sessionID);
            }),
            new RouteAction("/fika/update/setstatus", async (url: string, info: IFikaUpdateSetStatusRequestData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handleSetStatus(url, info, sessionID);
            }),
            new RouteAction("/fika/update/addplayer", async (url: string, info: IFikaUpdateAddPlayerData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handleRaidAddPlayer(url, info, sessionID);
            }),
            new RouteAction("/fika/update/playerdied", async (url: string, info: IFikaUpdateAddPlayerData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaUpdateCallbacks.handlePlayerDied(url, info, sessionID);
            }),
        ]);
    }
}
