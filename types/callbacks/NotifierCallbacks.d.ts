import { NotifierController } from "@spt/controllers/NotifierController";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INotifierChannel } from "@spt/models/eft/notifier/INotifier";
import { ISelectProfileResponse } from "@spt/models/eft/notifier/ISelectProfileResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class NotifierCallbacks {
    protected httpServerHelper: HttpServerHelper;
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected notifierController: NotifierController;
    constructor(httpServerHelper: HttpServerHelper, httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, notifierController: NotifierController);
    /**
     * If we don't have anything to send, it's ok to not send anything back
     * because notification requests can be long-polling. In fact, we SHOULD wait
     * until we actually have something to send because otherwise we'd spam the client
     * and the client would abort the connection due to spam.
     */
    sendNotification(sessionID: string, req: any, resp: any, data: any): void;
    /** Handle push/notifier/get */
    /** Handle push/notifier/getwebsocket */
    getNotifier(url: string, info: any, sessionID: string): IGetBodyResponseData<any[]>;
    /** Handle client/notifier/channel/create */
    createNotifierChannel(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<INotifierChannel>;
    /**
     * Handle client/game/profile/select
     * @returns ISelectProfileResponse
     */
    selectProfile(url: string, info: IUIDRequestData, sessionID: string): IGetBodyResponseData<ISelectProfileResponse>;
    notify(url: string, info: any, sessionID: string): string;
}
