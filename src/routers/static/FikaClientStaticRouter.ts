import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { FikaClientCallbacks } from "../../callbacks/FikaClientCallbacks";
import { IFikaCheckModRequestData } from "../../models/fika/routes/client/check/IFikaCheckModRequestData";
import { IFikaRaidServerIdRequestData } from "../../models/fika/routes/raid/IFikaRaidServerIdRequestData";

@injectable()
export class FikaClientStaticRouter extends StaticRouter {
    constructor(@inject("FikaClientCallbacks") protected fikaClientCallbacks: FikaClientCallbacks) {
        super([
            new RouteAction("/fika/client/config", async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaClientCallbacks.handleClientConfig(url, info, sessionID);
            }),
            new RouteAction("/fika/natpunchserver/config", async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaClientCallbacks.handleNatPunchServerConfig(url, info, sessionID);
            }),
            new RouteAction("/fika/client/check/mods", async (url: string, info: IFikaCheckModRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaClientCallbacks.handleCheckMods(url, info, sessionID);
            }),
            new RouteAction("/fika/profile/download", async (url: string, info: any, sessionID: string, _output: string): Promise<any> => {
                return this.fikaClientCallbacks.handleProfileDownload(url, info, sessionID);
            }),
            new RouteAction("/fika/client/check/version", async (url: string, info: any, sessionID: string, _output: string): Promise<any> => {
                return this.fikaClientCallbacks.handleVersionCheck(url, info, sessionID);
            }),
        ]);
    }
}
