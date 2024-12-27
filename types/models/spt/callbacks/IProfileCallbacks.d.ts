import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import type { IProfileChangeNicknameRequestData } from "@spt/models/eft/profile/IProfileChangeNicknameRequestData";
import type { IProfileChangeVoiceRequestData } from "@spt/models/eft/profile/IProfileChangeVoiceRequestData";
import type { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import type { ISearchFriendRequestData } from "@spt/models/eft/profile/ISearchFriendRequestData";
import type { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import type { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
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
