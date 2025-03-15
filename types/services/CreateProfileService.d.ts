import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PrestigeHelper } from "@spt/helpers/PrestigeHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { QuestRewardHelper } from "@spt/helpers/QuestRewardHelper";
import { RewardHelper } from "@spt/helpers/RewardHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class CreateProfileService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected profileFixerService: ProfileFixerService;
    protected itemHelper: ItemHelper;
    protected questHelper: QuestHelper;
    protected profileHelper: ProfileHelper;
    protected traderHelper: TraderHelper;
    protected localisationService: LocalisationService;
    protected mailSendService: MailSendService;
    protected prestigeHelper: PrestigeHelper;
    protected playerScavGenerator: PlayerScavGenerator;
    protected questRewardHelper: QuestRewardHelper;
    protected rewardHelper: RewardHelper;
    protected cloner: ICloner;
    protected eventOutputHolder: EventOutputHolder;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, saveServer: SaveServer, databaseService: DatabaseService, profileFixerService: ProfileFixerService, itemHelper: ItemHelper, questHelper: QuestHelper, profileHelper: ProfileHelper, traderHelper: TraderHelper, localisationService: LocalisationService, mailSendService: MailSendService, prestigeHelper: PrestigeHelper, playerScavGenerator: PlayerScavGenerator, questRewardHelper: QuestRewardHelper, rewardHelper: RewardHelper, cloner: ICloner, eventOutputHolder: EventOutputHolder);
    createProfile(sessionID: string, info: IProfileCreateRequestData): Promise<string>;
    /**
     * Delete a profile
     * @param sessionID Id of profile to delete
     */
    protected deleteProfileBySessionId(sessionID: string): void;
    /**
     * make profiles pmcData.Inventory.equipment unique
     * @param pmcData Profile to update
     */
    protected updateInventoryEquipmentId(pmcData: IPmcData): void;
    /**
     * For each trader reset their state to what a level 1 player would see
     * @param sessionId Session id of profile to reset
     */
    protected resetAllTradersInProfile(sessionId: string): void;
    /**
     * Ensure a profile has the necessary internal containers e.g. questRaidItems / sortingTable
     * DOES NOT check that stash exists
     * @param pmcData Profile to check
     */
    addMissingInternalContainersToProfile(pmcData: IPmcData): void;
    addCustomisationUnlocksToProfile(fullProfile: ISptProfile): void;
    protected getGameEdition(profile: ISptProfile): string;
    /**
     * Iterate over all quests in player profile, inspect rewards for the quests current state (accepted/completed)
     * and send rewards to them in mail
     * @param profileDetails Player profile
     * @param sessionID Session id
     * @param response Event router response
     */
    protected givePlayerStartingQuestRewards(profileDetails: ISptProfile, sessionID: string, response: IItemEventRouterResponse): void;
}
