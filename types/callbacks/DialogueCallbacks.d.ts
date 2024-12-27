import { DialogueController } from "@spt/controllers/DialogueController";
import type { OnUpdate } from "@spt/di/OnUpdate";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import type { IAcceptFriendRequestData, ICancelFriendRequestData, IDeclineFriendRequestData } from "@spt/models/eft/dialog/IAcceptFriendRequestData";
import type { IAddUserGroupMailRequest } from "@spt/models/eft/dialog/IAddUserGroupMailRequest";
import type { IChangeGroupMailOwnerRequest } from "@spt/models/eft/dialog/IChangeGroupMailOwnerRequest";
import type { IChatServer } from "@spt/models/eft/dialog/IChatServer";
import type { IClearMailMessageRequest } from "@spt/models/eft/dialog/IClearMailMessageRequest";
import type { ICreateGroupMailRequest } from "@spt/models/eft/dialog/ICreateGroupMailRequest";
import type { IDeleteFriendRequest } from "@spt/models/eft/dialog/IDeleteFriendRequest";
import type { IFriendRequestData } from "@spt/models/eft/dialog/IFriendRequestData";
import type { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import type { IGetAllAttachmentsRequestData } from "@spt/models/eft/dialog/IGetAllAttachmentsRequestData";
import type { IGetAllAttachmentsResponse } from "@spt/models/eft/dialog/IGetAllAttachmentsResponse";
import type { IGetChatServerListRequestData } from "@spt/models/eft/dialog/IGetChatServerListRequestData";
import type { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";
import type { IGetMailDialogInfoRequestData } from "@spt/models/eft/dialog/IGetMailDialogInfoRequestData";
import type { IGetMailDialogListRequestData } from "@spt/models/eft/dialog/IGetMailDialogListRequestData";
import type { IGetMailDialogViewRequestData } from "@spt/models/eft/dialog/IGetMailDialogViewRequestData";
import type { IGetMailDialogViewResponseData } from "@spt/models/eft/dialog/IGetMailDialogViewResponseData";
import type { IPinDialogRequestData } from "@spt/models/eft/dialog/IPinDialogRequestData";
import type { IRemoveDialogRequestData } from "@spt/models/eft/dialog/IRemoveDialogRequestData";
import type { IRemoveMailMessageRequest } from "@spt/models/eft/dialog/IRemoveMailMessageRequest";
import type { IRemoveUserGroupMailRequest } from "@spt/models/eft/dialog/IRemoveUserGroupMailRequest";
import type { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import type { ISetDialogReadRequestData } from "@spt/models/eft/dialog/ISetDialogReadRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import type { IDialogueInfo } from "@spt/models/eft/profile/ISptProfile";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
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
    getMailDialogList(url: string, info: IGetMailDialogListRequestData, sessionID: string): IGetBodyResponseData<IDialogueInfo[]>;
    /** Handle client/mail/dialog/view */
    getMailDialogView(url: string, info: IGetMailDialogViewRequestData, sessionID: string): IGetBodyResponseData<IGetMailDialogViewResponseData>;
    /** Handle client/mail/dialog/info */
    getMailDialogInfo(url: string, info: IGetMailDialogInfoRequestData, sessionID: string): IGetBodyResponseData<IDialogueInfo>;
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
    getAllAttachments(url: string, info: IGetAllAttachmentsRequestData, sessionID: string): IGetBodyResponseData<IGetAllAttachmentsResponse | undefined>;
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
    createGroupMail(url: string, info: ICreateGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    changeMailGroupOwner(url: string, info: IChangeGroupMailOwnerRequest, sessionID: string): IGetBodyResponseData<any[]>;
    addUserToMail(url: string, info: IAddUserGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    removeUserFromMail(url: string, info: IRemoveUserGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
