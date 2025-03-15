import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import { RewardHelper } from "@spt/helpers/RewardHelper";
export declare class QuestRewardHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected presetHelper: PresetHelper;
    protected cloner: ICloner;
    protected rewardHelper: RewardHelper;
    constructor(logger: ILogger, hashUtil: HashUtil, itemHelper: ItemHelper, databaseService: DatabaseService, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, traderHelper: TraderHelper, presetHelper: PresetHelper, cloner: ICloner, rewardHelper: RewardHelper);
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
}
