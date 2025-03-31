import { ClientLogCallbacks } from "@spt/callbacks/ClientLogCallbacks";
import { ClientLogController } from "@spt/controllers/ClientLogController";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { DependencyContainer, inject, injectable } from "tsyringe";
import { Override } from "../../di/Override";

@injectable()
export class ClientLogCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("ClientLogController") protected clientLogController: ClientLogController,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "ClientLogCallbacks",
            (_t, result: ClientLogCallbacks) => {
                result.clientLog = (_url: string, info: IClientLogRequest, _sessionID: string): INullResponseData => {
                    this.clientLogController.clientLog(info);

                    return this.httpResponseUtil.nullResponse();
                };
            },
            { frequency: "Always" },
        );
    }
}
