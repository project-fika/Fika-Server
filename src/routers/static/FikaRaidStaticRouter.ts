import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt-aki/di/Router";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";

import { FikaRaidCallbacks } from "../../callbacks/FikaRaidCallbacks";
import { IFikaRaidServerIdRequestData } from "../../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidJoinRequestData } from "../../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidLeaveRequestData } from "../../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";

@injectable()
export class FikaRaidStaticRouter extends StaticRouter {
    constructor(@inject("FikaRaidCallbacks") protected fikaRaidCallbacks: FikaRaidCallbacks) {
        super([
            new RouteAction("/fika/raid/create", (url: string, info: IFikaRaidCreateRequestData, sessionID: string, _output: string): string => {
                return this.fikaRaidCallbacks.handleRaidCreate(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/join", (url: string, info: IFikaRaidJoinRequestData, sessionID: string, _output: string): string => {
                return this.fikaRaidCallbacks.handleRaidJoin(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/leave", (url: string, info: IFikaRaidLeaveRequestData, sessionID: string, _output: string): INullResponseData => {
                return this.fikaRaidCallbacks.handleRaidLeave(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/gethost", (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): string => {
                return this.fikaRaidCallbacks.handleRaidGethost(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/spawnpoint", (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): string => {
                return this.fikaRaidCallbacks.handleRaidSpawnpoint(url, info, sessionID);
            }),
            new RouteAction("/fika/raid/getsettings", (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, _output: string): string => {
                return this.fikaRaidCallbacks.handleRaidGetSettings(url, info, sessionID);
            }),
        ]);
    }
}
