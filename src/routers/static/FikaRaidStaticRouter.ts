import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";

import { FikaRaidCallbacks } from "../../callbacks/FikaRaidCallbacks";
import { IFikaRaidServerIdRequestData } from "../../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidJoinRequestData } from "../../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidLeaveRequestData } from "../../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";

@injectable()
export class FikaRaidStaticRouter extends StaticRouter {
    constructor(@inject("FikaRaidCallbacks") protected fikaRaidCallbacks: FikaRaidCallbacks) {
        super([
            new RouteAction("/fika/raid/create", async (url: string, info: IFikaRaidCreateRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaRaidCallbacks.handleRaidCreate(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/join", async (url: string, info: IFikaRaidJoinRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaRaidCallbacks.handleRaidJoin(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/leave", async (url: string, info: IFikaRaidLeaveRequestData, sessionID: string, _output: string): Promise<INullResponseData> => {
                return this.fikaRaidCallbacks.handleRaidLeave(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/gethost", async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaRaidCallbacks.handleRaidGethost(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/spawnpoint", async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaRaidCallbacks.handleRaidSpawnpoint(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/getsettings", async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): Promise<string> => {
                return this.fikaRaidCallbacks.handleRaidGetSettings(url, info, sessionID);
            }),
        ]);
    }
}
