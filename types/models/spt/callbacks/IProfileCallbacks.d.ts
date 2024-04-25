import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IProfileChangeNicknameRequestData } from "@spt-aki/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt-aki/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt-aki/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt-aki/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt-aki/models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "@spt-aki/models/eft/profile/IValidateNicknameRequestData";
export interface IProfileCallbacks {
    onLoad(sessionID: string): any;
    createProfile(url: string, info: IProfileCreateRequestData, sessionID: string): IGetBodyResponseData<any>;
    getProfileData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    regenerateScav(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    changeVoice(url: string, info: IProfileChangeVoiceRequestData, sessionID: string): INullResponseData;
    changeNickname(url: string, info: IProfileChangeNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    validateNickname(url: string, info: IValidateNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    getReservedNickname(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string>;
    getProfileStatus(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    searchFriend(url: string, info: ISearchFriendRequestData, sessionID: string): IGetBodyResponseData<ISearchFriendResponse>;
}
