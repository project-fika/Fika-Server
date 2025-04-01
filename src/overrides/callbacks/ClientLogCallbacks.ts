import { ClientLogCallbacks } from "@spt/callbacks/ClientLogCallbacks";
import { ClientLogController } from "@spt/controllers/ClientLogController";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { DependencyContainer, inject, injectable } from "tsyringe";
import { Override } from "../../di/Override";
import { FikaHeadlessHelper } from "../../helpers/FikaHeadlessHelper";

@injectable()
export class ClientLogCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaHeadlessHelper") protected fikaHeadlessHelper: FikaHeadlessHelper,
        @inject("ClientLogController") protected clientLogController: ClientLogController,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "ClientLogCallbacks",
            (_t, result: ClientLogCallbacks) => {
                result.clientLog = (url: string, info: IClientLogRequest, sessionID: string): INullResponseData => {
                    if (this.fikaHeadlessHelper.isHeadlessClient(sessionID)) {
                        this.clientLogController.clientLog(info);

                        return this.httpResponseUtil.nullResponse();
                    }

                    return ClientLogCallbacks.prototype.clientLog.call(result, url, info, sessionID);
                };
            },
            { frequency: "Always" },
        );
    }
}
