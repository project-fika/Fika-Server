import { PlayerScavGenerator } from "@spt-aki/generators/PlayerScavGenerator";
import { DialogueHelper } from "@spt-aki/helpers/DialogueHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IMiniProfile } from "@spt-aki/models/eft/launcher/IMiniProfile";
import { GetProfileStatusResponseData } from "@spt-aki/models/eft/profile/GetProfileStatusResponseData";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IGetOtherProfileRequest } from "@spt-aki/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt-aki/models/eft/profile/IGetOtherProfileResponse";
import { IProfileChangeNicknameRequestData } from "@spt-aki/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt-aki/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt-aki/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt-aki/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt-aki/models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "@spt-aki/models/eft/profile/IValidateNicknameRequestData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { ProfileFixerService } from "@spt-aki/services/ProfileFixerService";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class ProfileController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
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
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, seasonalEventService: SeasonalEventService, mailSendService: MailSendService, playerScavGenerator: PlayerScavGenerator, eventOutputHolder: EventOutputHolder, traderHelper: TraderHelper, dialogueHelper: DialogueHelper, questHelper: QuestHelper, profileHelper: ProfileHelper);
    /**
     * Handle /launcher/profiles
     */
    getMiniProfiles(): IMiniProfile[];
    /**
     * Handle launcher/profile/info
     */
    getMiniProfile(sessionID: string): any;
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
    protected givePlayerStartingQuestRewards(profileDetails: IAkiProfile, sessionID: string, response: IItemEventRouterResponse): void;
    /**
     * For each trader reset their state to what a level 1 player would see
     * @param sessionID Session id of profile to reset
     */
    protected resetAllTradersInProfile(sessionID: string): void;
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
}
