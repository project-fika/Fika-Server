import { ProfileController } from "@spt-aki/controllers/ProfileController";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IGetMiniProfileRequestData } from "@spt-aki/models/eft/launcher/IGetMiniProfileRequestData";
import { GetProfileStatusResponseData } from "@spt-aki/models/eft/profile/GetProfileStatusResponseData";
import { ICreateProfileResponse } from "@spt-aki/models/eft/profile/ICreateProfileResponse";
import { IGetOtherProfileRequest } from "@spt-aki/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt-aki/models/eft/profile/IGetOtherProfileResponse";
import { IGetProfileSettingsRequest } from "@spt-aki/models/eft/profile/IGetProfileSettingsRequest";
import { IProfileChangeNicknameRequestData } from "@spt-aki/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt-aki/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt-aki/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt-aki/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt-aki/models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "@spt-aki/models/eft/profile/IValidateNicknameRequestData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
/** Handle profile related client events */
export declare class ProfileCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected timeUtil: TimeUtil;
    protected profileController: ProfileController;
    protected profileHelper: ProfileHelper;
    constructor(httpResponse: HttpResponseUtil, timeUtil: TimeUtil, profileController: ProfileController, profileHelper: ProfileHelper);
    /**
     * Handle client/game/profile/create
     */
    createProfile(url: string, info: IProfileCreateRequestData, sessionID: string): IGetBodyResponseData<ICreateProfileResponse>;
    /**
     * Handle client/game/profile/list
     * Get the complete player profile (scav + pmc character)
     */
    getProfileData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcData[]>;
    /**
     * Handle client/game/profile/savage/regenerate
     * Handle the creation of a scav profile for player
     * Occurs post-raid and when profile first created immediately after character details are confirmed by player
     * @param url
     * @param info empty
     * @param sessionID Session id
     * @returns Profile object
     */
    regenerateScav(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcData[]>;
    /**
     * Handle client/game/profile/voice/change event
     */
    changeVoice(url: string, info: IProfileChangeVoiceRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/game/profile/nickname/change event
     * Client allows player to adjust their profile name
     */
    changeNickname(url: string, info: IProfileChangeNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    /**
     * Handle client/game/profile/nickname/validate
     */
    validateNickname(url: string, info: IValidateNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    /**
     * Handle client/game/profile/nickname/reserved
     */
    getReservedNickname(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Handle client/profile/status
     * Called when creating a character when choosing a character face/voice
     */
    getProfileStatus(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<GetProfileStatusResponseData>;
    /**
     * Handle client/profile/view
     * Called when viewing another players profile
     */
    getOtherProfile(url: string, request: IGetOtherProfileRequest, sessionID: string): IGetBodyResponseData<IGetOtherProfileResponse>;
    /**
     * Handle client/profile/settings
     */
    getProfileSettings(url: string, info: IGetProfileSettingsRequest, sessionId: string): IGetBodyResponseData<string>;
    /**
     * Handle client/game/profile/search
     */
    searchFriend(url: string, info: ISearchFriendRequestData, sessionID: string): IGetBodyResponseData<ISearchFriendResponse[]>;
    /**
     * Handle launcher/profile/info
     */
    getMiniProfile(url: string, info: IGetMiniProfileRequestData, sessionID: string): string;
    /**
     * Handle /launcher/profiles
     */
    getAllMiniProfiles(url: string, info: IEmptyRequestData, sessionID: string): string;
}
