import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { CustomisationSource } from "@spt/models/eft/common/tables/ICustomisationStorage";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IReward } from "@spt/models/eft/common/tables/IReward";
import { IHideoutProduction } from "@spt/models/eft/hideout/IHideoutProduction";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RewardHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected itemHelper: ItemHelper;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected presetHelper: PresetHelper;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, itemHelper: ItemHelper, databaseService: DatabaseService, profileHelper: ProfileHelper, localisationService: LocalisationService, traderHelper: TraderHelper, presetHelper: PresetHelper, cloner: ICloner);
    /**
     * Apply the given rewards to the passed in profile
     * @param rewards List of rewards to apply
     * @param source The source of the rewards (Achievement, quest)
     * @param fullProfile The full profile to apply the rewards to
     * @param questId The quest or achievement ID, used for finding production unlocks
     * @param questResponse Response to quest completion when a production is unlocked
     * @returns List of items that were rewarded
     */
    applyRewards(rewards: IReward[], source: CustomisationSource, fullProfile: ISptProfile, profileData: IPmcData, questId: string, questResponse?: IItemEventRouterResponse): IItem[];
    /**
     * Does the provided reward have a game version requirement to be given and does it match
     * @param reward Reward to check
     * @param gameVersion Version of game to check reward against
     * @returns True if it has requirement, false if it doesnt pass check
     */
    rewardIsForGameEdition(reward: IReward, gameVersion: string): boolean;
    /**
     * WIP - Find hideout craft id and add to unlockedProductionRecipe array in player profile
     * also update client response recipeUnlocked array with craft id
     * @param pmcData Player profile
     * @param craftUnlockReward Reward with craft unlock details
     * @param questId Quest or achievement ID with craft unlock reward
     * @param sessionID Session id
     * @param response Response to send back to client
     */
    protected findAndAddHideoutProductionIdToProfile(pmcData: IPmcData, craftUnlockReward: IReward, questId: string, sessionID: string, response?: IItemEventRouterResponse): void;
    /**
     * Find hideout craft for the specified reward
     * @param craftUnlockReward Reward with craft unlock details
     * @param questId Quest or achievement ID with craft unlock reward
     * @returns Hideout craft
     */
    getRewardProductionMatch(craftUnlockReward: IReward, questId: string): IHideoutProduction[];
    /**
     * Gets a flat list of reward items from the given rewards for the specified game version
     * @param rewards Array of rewards to get the items from
     * @param gameVersion The game version of the profile
     * @returns array of items with the correct maxStack
     */
    protected getRewardItems(rewards: IReward[], gameVersion: string): IItem[];
    /**
     * Take reward item and set FiR status + fix stack sizes + fix mod Ids
     * @param reward Reward item to fix
     * @returns Fixed rewards
     */
    protected processReward(reward: IReward): IItem[];
    /**
     * Add missing mod items to an armor reward
     * @param originalRewardRootItem Original armor reward item from IReward.items object
     * @param reward Armor reward
     */
    protected generateArmorRewardChildSlots(originalRewardRootItem: IItem, reward: IReward): void;
    /**
     * Add an achievement to player profile and handle any rewards for the achievement
     * Triggered from a quest, or another achievement
     * @param fullProfile Profile to add achievement to
     * @param achievementId Id of achievement to add
     */
    addAchievementToProfile(fullProfile: ISptProfile, achievementId: string): void;
}
