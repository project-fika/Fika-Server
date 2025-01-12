import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IReward } from "@spt/models/eft/common/tables/IReward";
import { IHideoutProduction } from "@spt/models/eft/hideout/IHideoutProduction";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class QuestRewardHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseService: DatabaseService;
    protected eventOutputHolder: EventOutputHolder;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected presetHelper: PresetHelper;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, itemHelper: ItemHelper, databaseService: DatabaseService, eventOutputHolder: EventOutputHolder, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, traderHelper: TraderHelper, presetHelper: PresetHelper, cloner: ICloner);
    /**
     * Give player quest rewards - Skills/exp/trader standing/items/assort unlocks - Returns reward items player earned
     * @param profileData Player profile (scav or pmc)
     * @param questId questId of quest to get rewards for
     * @param state State of the quest to get rewards for
     * @param sessionId Session id
     * @param questResponse Response to send back to client
     * @returns Array of reward objects
     */
    applyQuestReward(profileData: IPmcData, questId: string, state: QuestStatus, sessionId: string, questResponse: IItemEventRouterResponse): IItem[];
    /**
     * Does the provided quest reward have a game version requirement to be given and does it match
     * @param reward Reward to check
     * @param gameVersion Version of game to check reward against
     * @returns True if it has requirement, false if it doesnt pass check
     */
    questRewardIsForGameEdition(reward: IReward, gameVersion: string): boolean;
    /**
     * Get quest by id from database (repeatables are stored in profile, check there if questId not found)
     * @param questId Id of quest to find
     * @param pmcData Player profile
     * @returns IQuest object
     */
    protected getQuestFromDb(questId: string, pmcData: IPmcData): IQuest;
    /**
     * Get players money reward bonus from profile
     * @param pmcData player profile
     * @returns bonus as a percent
     */
    protected getQuestMoneyRewardBonusMultiplier(pmcData: IPmcData): number;
    /**
     * Adjust quest money rewards by passed in multiplier
     * @param quest Quest to multiple money rewards
     * @param bonusPercent Pecent to adjust money rewards by
     * @param questStatus Status of quest to apply money boost to rewards of
     * @returns Updated quest
     */
    applyMoneyBoost(quest: IQuest, bonusPercent: number, questStatus: QuestStatus): IQuest;
    /**
     * WIP - Find hideout craft id and add to unlockedProductionRecipe array in player profile
     * also update client response recipeUnlocked array with craft id
     * @param pmcData Player profile
     * @param craftUnlockReward Reward item from quest with craft unlock details
     * @param questDetails Quest with craft unlock reward
     * @param sessionID Session id
     * @param response Response to send back to client
     */
    protected findAndAddHideoutProductionIdToProfile(pmcData: IPmcData, craftUnlockReward: IReward, questDetails: IQuest, sessionID: string, response: IItemEventRouterResponse): void;
    /**
     * Find hideout craft for the specified quest reward
     * @param craftUnlockReward Reward item from quest with craft unlock details
     * @param questDetails Quest with craft unlock reward
     * @returns Hideout craft
     */
    getRewardProductionMatch(craftUnlockReward: IReward, questDetails: IQuest): IHideoutProduction[];
    /**
     * Gets a flat list of reward items for the given quest at a specific state for the specified game version (e.g. Fail/Success)
     * @param quest quest to get rewards for
     * @param status Quest status that holds the items (Started, Success, Fail)
     * @returns array of items with the correct maxStack
     */
    protected getQuestRewardItems(quest: IQuest, status: QuestStatus, gameVersion: string): IItem[];
    /**
     * Take reward item from quest and set FiR status + fix stack sizes + fix mod Ids
     * @param questReward Reward item to fix
     * @returns Fixed rewards
     */
    protected processReward(questReward: IReward): IItem[];
    /**
     * Add missing mod items to a quest armor reward
     * @param originalRewardRootItem Original armor reward item from IReward.items object
     * @param questReward Armor reward from quest
     */
    protected generateArmorRewardChildSlots(originalRewardRootItem: IItem, questReward: IReward): void;
}
