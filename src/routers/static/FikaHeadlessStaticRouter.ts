import { inject, injectable } from "tsyringe";

import { RouteAction, StaticRouter } from "@spt/di/Router";

import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { FikaHeadlessCallbacks } from "../../callbacks/FikaHeadlessCallbacks";

@injectable()
export class FikaHeadlessStaticRouter extends StaticRouter {
    constructor(@inject("FikaHeadlessCallbacks") protected fikaHeadlessCallbacks: FikaHeadlessCallbacks) {
        super([
            new RouteAction("/fika/headless/get", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaHeadlessCallbacks.handleGetHeadlesses(url, info, sessionID);
            }),
            new RouteAction("/fika/headless/available", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaHeadlessCallbacks.handleAvailableHeadlesses(url, info, sessionID);
            }),
            new RouteAction("/fika/headless/restartafterraidamount", async (url: string, info: any, sessionID: string, _output: string): Promise<string> => {
                return this.fikaHeadlessCallbacks.handleRestartAfterRaidAmount(url, info, sessionID);
            }),
            new RouteAction("/fika/headless/questtemplates", async (url: string, info: any, sessionID: string, _output: string): Promise<IGetBodyResponseData<IQuest[]>> => {
                return this.fikaHeadlessCallbacks.handleGetAllQuestTemplates(url, info, sessionID);
            }),
        ]);
    }
}
