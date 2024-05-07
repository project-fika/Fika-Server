import { DialogueController } from "@spt-aki/controllers/DialogueController";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IUIDRequestData } from "@spt-aki/models/eft/common/request/IUIDRequestData";
import { IAcceptFriendRequestData, ICancelFriendRequestData, IDeclineFriendRequestData } from "@spt-aki/models/eft/dialog/IAcceptFriendRequestData";
import { IChatServer } from "@spt-aki/models/eft/dialog/IChatServer";
import { IClearMailMessageRequest } from "@spt-aki/models/eft/dialog/IClearMailMessageRequest";
import { IDeleteFriendRequest } from "@spt-aki/models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "@spt-aki/models/eft/dialog/IFriendRequestData";
import { IFriendRequestSendResponse } from "@spt-aki/models/eft/dialog/IFriendRequestSendResponse";
import { IGetAllAttachmentsRequestData } from "@spt-aki/models/eft/dialog/IGetAllAttachmentsRequestData";
import { IGetAllAttachmentsResponse } from "@spt-aki/models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetChatServerListRequestData } from "@spt-aki/models/eft/dialog/IGetChatServerListRequestData";
import { IGetFriendListDataResponse } from "@spt-aki/models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogInfoRequestData } from "@spt-aki/models/eft/dialog/IGetMailDialogInfoRequestData";
import { IGetMailDialogListRequestData } from "@spt-aki/models/eft/dialog/IGetMailDialogListRequestData";
import { IGetMailDialogViewRequestData } from "@spt-aki/models/eft/dialog/IGetMailDialogViewRequestData";
import { IGetMailDialogViewResponseData } from "@spt-aki/models/eft/dialog/IGetMailDialogViewResponseData";
import { IPinDialogRequestData } from "@spt-aki/models/eft/dialog/IPinDialogRequestData";
import { IRemoveDialogRequestData } from "@spt-aki/models/eft/dialog/IRemoveDialogRequestData";
import { IRemoveMailMessageRequest } from "@spt-aki/models/eft/dialog/IRemoveMailMessageRequest";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { ISetDialogReadRequestData } from "@spt-aki/models/eft/dialog/ISetDialogReadRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { DialogueInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class DialogueCallbacks implements OnUpdate {
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected httpResponse: HttpResponseUtil;
    protected dialogueController: DialogueController;
    constructor(hashUtil: HashUtil, timeUtil: TimeUtil, httpResponse: HttpResponseUtil, dialogueController: DialogueController);
    /**
     * Handle client/friend/list
     * @returns IGetFriendListDataResponse
     */
    getFriendList(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetFriendListDataResponse>;
    /**
     * Handle client/chatServer/list
     * @returns IChatServer[]
     */
    getChatServerList(url: string, info: IGetChatServerListRequestData, sessionID: string): IGetBodyResponseData<IChatServer[]>;
    /** Handle client/mail/dialog/list */
    getMailDialogList(url: string, info: IGetMailDialogListRequestData, sessionID: string): IGetBodyResponseData<DialogueInfo[]>;
    /** Handle client/mail/dialog/view */
    getMailDialogView(url: string, info: IGetMailDialogViewRequestData, sessionID: string): IGetBodyResponseData<IGetMailDialogViewResponseData>;
    /** Handle client/mail/dialog/info */
    getMailDialogInfo(url: string, info: IGetMailDialogInfoRequestData, sessionID: string): IGetBodyResponseData<DialogueInfo>;
    /** Handle client/mail/dialog/remove */
    removeDialog(url: string, info: IRemoveDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /** Handle client/mail/dialog/pin */
    pinDialog(url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /** Handle client/mail/dialog/unpin */
    unpinDialog(url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /** Handle client/mail/dialog/read */
    setRead(url: string, info: ISetDialogReadRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /**
     * Handle client/mail/dialog/getAllAttachments
     * @returns IGetAllAttachmentsResponse
     */
    getAllAttachments(url: string, info: IGetAllAttachmentsRequestData, sessionID: string): IGetBodyResponseData<IGetAllAttachmentsResponse>;
    /** Handle client/mail/msg/send */
    sendMessage(url: string, request: ISendMessageRequest, sessionID: string): IGetBodyResponseData<string>;
    /** Handle client/friend/request/list/outbox */
    listOutbox(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /**
     * Handle client/friend/request/list/inbox
     */
    listInbox(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /**
     * Handle client/friend/request/send
     */
    sendFriendRequest(url: string, request: IFriendRequestData, sessionID: string): IGetBodyResponseData<IFriendRequestSendResponse>;
    /**
     * Handle client/friend/request/accept-all
     */
    acceptAllFriendRequests(url: string, request: IEmptyRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/friend/request/accept
     */
    acceptFriendRequest(url: string, request: IAcceptFriendRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /**
     * Handle client/friend/request/decline
     */
    declineFriendRequest(url: string, request: IDeclineFriendRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /**
     * Handle client/friend/request/cancel
     */
    cancelFriendRequest(url: string, request: ICancelFriendRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/friend/delete */
    deleteFriend(url: string, request: IDeleteFriendRequest, sessionID: string): INullResponseData;
    /** Handle client/friend/ignore/set */
    ignoreFriend(url: string, request: IUIDRequestData, sessionID: string): INullResponseData;
    /** Handle client/friend/ignore/remove */
    unIgnoreFriend(url: string, request: IUIDRequestData, sessionID: string): INullResponseData;
    clearMail(url: string, request: IClearMailMessageRequest, sessionID: string): IGetBodyResponseData<any[]>;
    removeMail(url: string, request: IRemoveMailMessageRequest, sessionID: string): IGetBodyResponseData<any[]>;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
