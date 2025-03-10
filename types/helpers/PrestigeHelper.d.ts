import { IReward } from "@spt/models/eft/common/tables/IReward";
import { IPendingPrestige, ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { MailSendService } from "@spt/services/MailSendService";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import { ProfileHelper } from "./ProfileHelper";
import { RewardHelper } from "./RewardHelper";
export declare class PrestigeHelper {
    protected logger: ILogger;
    protected cloner: ICloner;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected mailSendService: MailSendService;
    protected profileHelper: ProfileHelper;
    protected rewardHelper: RewardHelper;
    constructor(logger: ILogger, cloner: ICloner, timeUtil: TimeUtil, databaseService: DatabaseService, mailSendService: MailSendService, profileHelper: ProfileHelper, rewardHelper: RewardHelper);
    processPendingPrestige(oldProfile: ISptProfile, newProfile: ISptProfile, prestige: IPendingPrestige): void;
    protected addPrestigeRewardsToProfile(sessionId: string, newProfile: ISptProfile, rewards: IReward[]): void;
}
