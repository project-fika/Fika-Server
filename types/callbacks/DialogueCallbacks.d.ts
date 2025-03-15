import { DialogueController } from "@spt/controllers/DialogueController";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import { IAcceptFriendRequestData, ICancelFriendRequestData, IDeclineFriendRequestData } from "@spt/models/eft/dialog/IAcceptFriendRequestData";
import { IAddUserGroupMailRequest } from "@spt/models/eft/dialog/IAddUserGroupMailRequest";
import { IChangeGroupMailOwnerRequest } from "@spt/models/eft/dialog/IChangeGroupMailOwnerRequest";
import { IChatServer } from "@spt/models/eft/dialog/IChatServer";
import { IClearMailMessageRequest } from "@spt/models/eft/dialog/IClearMailMessageRequest";
import { ICreateGroupMailRequest } from "@spt/models/eft/dialog/ICreateGroupMailRequest";
import { IDeleteFriendRequest } from "@spt/models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "@spt/models/eft/dialog/IFriendRequestData";
import { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import { IGetAllAttachmentsRequestData } from "@spt/models/eft/dialog/IGetAllAttachmentsRequestData";
import { IGetAllAttachmentsResponse } from "@spt/models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetChatServerListRequestData } from "@spt/models/eft/dialog/IGetChatServerListRequestData";
import { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogInfoRequestData } from "@spt/models/eft/dialog/IGetMailDialogInfoRequestData";
import { IGetMailDialogListRequestData } from "@spt/models/eft/dialog/IGetMailDialogListRequestData";
import { IGetMailDialogViewRequestData } from "@spt/models/eft/dialog/IGetMailDialogViewRequestData";
import { IGetMailDialogViewResponseData } from "@spt/models/eft/dialog/IGetMailDialogViewResponseData";
import { IPinDialogRequestData } from "@spt/models/eft/dialog/IPinDialogRequestData";
import { IRemoveDialogRequestData } from "@spt/models/eft/dialog/IRemoveDialogRequestData";
import { IRemoveUserGroupMailRequest } from "@spt/models/eft/dialog/IRemoveUserGroupMailRequest";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { ISetDialogReadRequestData } from "@spt/models/eft/dialog/ISetDialogReadRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IDialogueInfo } from "@spt/models/eft/profile/ISptProfile";
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
    createGroupMail(url: string, info: ICreateGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    changeMailGroupOwner(url: string, info: IChangeGroupMailOwnerRequest, sessionID: string): IGetBodyResponseData<any[]>;
    addUserToMail(url: string, info: IAddUserGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    removeUserFromMail(url: string, info: IRemoveUserGroupMailRequest, sessionID: string): IGetBodyResponseData<any[]>;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
