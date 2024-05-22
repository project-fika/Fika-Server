import { DependencyContainer, inject, injectable } from "tsyringe";

import { DialogueCallbacks } from "@spt/callbacks/DialogueCallbacks";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import { IAcceptFriendRequestData, ICancelFriendRequestData, IDeclineFriendRequestData } from "@spt/models/eft/dialog/IAcceptFriendRequestData";
import { IDeleteFriendRequest } from "@spt/models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "@spt/models/eft/dialog/IFriendRequestData";
import { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaDialogueController } from "../../controllers/FikaDialogueController";
import { Override } from "../../di/Override";

@injectable()
export class DialogueCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaDialogueController") protected fikaDialogueController: FikaDialogueController,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "DialogueCallbacks",
            (_t, result: DialogueCallbacks) => {
                result.listOutbox = (_url: string, _info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]> => {
                    return this.httpResponseUtil.getBody(this.fikaDialogueController.listOutbox(sessionID));
                };

                result.listInbox = (_url: string, _info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]> => {
                    return this.httpResponseUtil.getBody(this.fikaDialogueController.listInbox(sessionID));
                };

                result.sendFriendRequest = (_url: string, info: IFriendRequestData, sessionID: string): IGetBodyResponseData<IFriendRequestSendResponse> => {
                    return this.httpResponseUtil.getBody(this.fikaDialogueController.sendFriendRequest(sessionID, info.to));
                };

                result.acceptAllFriendRequests = (_url: string, _info: IEmptyRequestData, sessionID: string): INullResponseData => {
                    this.fikaDialogueController.acceptAllFriendRequests(sessionID);

                    return this.httpResponseUtil.nullResponse();
                };

                result.acceptFriendRequest = (_url: string, info: IAcceptFriendRequestData, sessionID: string): IGetBodyResponseData<boolean> => {
                    this.fikaDialogueController.acceptFriendRequest(info.profileId, sessionID);

                    return this.httpResponseUtil.getBody(true);
                };

                result.declineFriendRequest = (_url: string, info: IDeclineFriendRequestData, sessionID: string): IGetBodyResponseData<boolean> => {
                    this.fikaDialogueController.declineFriendRequest(info.profileId, sessionID);

                    return this.httpResponseUtil.getBody(true);
                };

                result.cancelFriendRequest = (_url: string, info: ICancelFriendRequestData, sessionID: string): IGetBodyResponseData<boolean> => {
                    this.fikaDialogueController.cancelFriendRequest(sessionID, info.profileId);

                    return this.httpResponseUtil.getBody(true);
                };

                result.deleteFriend = (_url: string, info: IDeleteFriendRequest, sessionID: string): INullResponseData => {
                    this.fikaDialogueController.deleteFriend(sessionID, info.friend_id);

                    return this.httpResponseUtil.nullResponse();
                };

                result.ignoreFriend = (_url: string, info: IUIDRequestData, sessionID: string): INullResponseData => {
                    this.fikaDialogueController.ignoreFriend(sessionID, info.uid);

                    return this.httpResponseUtil.nullResponse();
                };

                result.unIgnoreFriend = (_url: string, info: IUIDRequestData, sessionID: string): INullResponseData => {
                    this.fikaDialogueController.unIgnoreFriend(sessionID, info.uid);

                    return this.httpResponseUtil.nullResponse();
                };
            },
            { frequency: "Always" },
        );
    }
}
