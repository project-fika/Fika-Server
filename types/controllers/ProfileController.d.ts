import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IMiniProfile } from "@spt/models/eft/launcher/IMiniProfile";
import { GetProfileStatusResponseData } from "@spt/models/eft/profile/GetProfileStatusResponseData";
import { IGetOtherProfileRequest } from "@spt/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt/models/eft/profile/IGetOtherProfileResponse";
import { IGetProfileSettingsRequest } from "@spt/models/eft/profile/IGetProfileSettingsRequest";
import { IProfileChangeNicknameRequestData } from "@spt/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ProfileController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected cloner: ICloner;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected profileFixerService: ProfileFixerService;
    protected localisationService: LocalisationService;
    protected seasonalEventService: SeasonalEventService;
    protected mailSendService: MailSendService;
    protected playerScavGenerator: PlayerScavGenerator;
    protected eventOutputHolder: EventOutputHolder;
    protected traderHelper: TraderHelper;
    protected dialogueHelper: DialogueHelper;
    protected questHelper: QuestHelper;
    protected profileHelper: ProfileHelper;
    constructor(logger: ILogger, hashUtil: HashUtil, cloner: ICloner, timeUtil: TimeUtil, saveServer: SaveServer, databaseService: DatabaseService, itemHelper: ItemHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, seasonalEventService: SeasonalEventService, mailSendService: MailSendService, playerScavGenerator: PlayerScavGenerator, eventOutputHolder: EventOutputHolder, traderHelper: TraderHelper, dialogueHelper: DialogueHelper, questHelper: QuestHelper, profileHelper: ProfileHelper);
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
     * @param info Client reqeust object
     * @param sessionID Player id
     * @returns Profiles _id value
     */
    createProfile(info: IProfileCreateRequestData, sessionID: string): string;
    /**
     * make profiles pmcData.Inventory.equipment unique
     * @param pmcData Profile to update
     */
    protected updateInventoryEquipmentId(pmcData: IPmcData): void;
    /**
     * Delete a profile
     * @param sessionID Id of profile to delete
     */
    protected deleteProfileBySessionId(sessionID: string): void;
    /**
     * Iterate over all quests in player profile, inspect rewards for the quests current state (accepted/completed)
     * and send rewards to them in mail
     * @param profileDetails Player profile
     * @param sessionID Session id
     * @param response Event router response
     */
    protected givePlayerStartingQuestRewards(profileDetails: ISptProfile, sessionID: string, response: IItemEventRouterResponse): void;
    /**
     * For each trader reset their state to what a level 1 player would see
     * @param sessionId Session id of profile to reset
     */
    protected resetAllTradersInProfile(sessionId: string): void;
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
    getProfileStatus(sessionId: string): GetProfileStatusResponseData;
    getOtherProfile(sessionId: string, request: IGetOtherProfileRequest): IGetOtherProfileResponse;
    /**
     * Handle client/profile/settings
     */
    setChosenProfileIcon(sessionId: string, request: IGetProfileSettingsRequest): boolean;
}
