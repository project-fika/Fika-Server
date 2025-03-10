import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IMiniProfile } from "@spt/models/eft/launcher/IMiniProfile";
import { IGetProfileStatusResponseData } from "@spt/models/eft/profile/GetProfileStatusResponseData";
import { IGetOtherProfileRequest } from "@spt/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt/models/eft/profile/IGetOtherProfileResponse";
import { IGetProfileSettingsRequest } from "@spt/models/eft/profile/IGetProfileSettingsRequest";
import { IProfileChangeNicknameRequestData } from "@spt/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { CreateProfileService } from "@spt/services/CreateProfileService";
import { DatabaseService } from "@spt/services/DatabaseService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ProfileController {
    protected logger: ILogger;
    protected cloner: ICloner;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected createProfileService: CreateProfileService;
    protected playerScavGenerator: PlayerScavGenerator;
    protected profileHelper: ProfileHelper;
    protected itemHelper: ItemHelper;
    constructor(logger: ILogger, cloner: ICloner, saveServer: SaveServer, databaseService: DatabaseService, createProfileService: CreateProfileService, playerScavGenerator: PlayerScavGenerator, profileHelper: ProfileHelper, itemHelper: ItemHelper);
    /**
     * Handle /launcher/profiles
     */
    getMiniProfiles(): IMiniProfile[];
    /**
     * Handle launcher/profile/info
     */
    getMiniProfile(sessionID: string): IMiniProfile;
    /**
     * Handle client/game/profile/list
     */
    getCompleteProfile(sessionID: string): IPmcData[];
    /**
     * Handle client/game/profile/create
     * @param info Client request object
     * @param sessionID Player id
     * @returns Profiles _id value
     */
    createProfile(info: IProfileCreateRequestData, sessionID: string): Promise<string>;
    /**
     * Generate a player scav object
     * PMC profile MUST exist first before pscav can be generated
     * @param sessionID
     * @returns IPmcData object
     */
    generatePlayerScav(sessionID: string): IPmcData;
    /**
     * Handle client/game/profile/nickname/validate
     */
    validateNickname(info: IValidateNicknameRequestData, sessionID: string): string;
    /**
     * Handle client/game/profile/nickname/change event
     * Client allows player to adjust their profile name
     */
    changeNickname(info: IProfileChangeNicknameRequestData, sessionID: string): string;
    /**
     * Handle client/game/profile/voice/change event
     */
    changeVoice(info: IProfileChangeVoiceRequestData, sessionID: string): void;
    /**
     * Handle client/game/profile/search
     */
    getFriends(info: ISearchFriendRequestData, sessionID: string): ISearchFriendResponse[];
    /**
     * Handle client/profile/status
     */
    getProfileStatus(sessionId: string): IGetProfileStatusResponseData;
    /**
     * Handle client/profile/view
     */
    getOtherProfile(sessionId: string, request: IGetOtherProfileRequest): IGetOtherProfileResponse;
    /**
     * Handle client/profile/settings
     */
    setChosenProfileIcon(sessionId: string, request: IGetProfileSettingsRequest): boolean;
}
