import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import type { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPrestige } from "@spt/models/eft/common/tables/IPrestige";
import { IObtainPrestigeRequest } from "@spt/models/eft/prestige/IObtainPrestigeRequest";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { ProfileFixerService } from "@spt/services/ProfileFixerService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import type { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
export declare class PrestigeController {
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
     * Handle /client/prestige/list
     */
    getPrestige(sessionID: string, info: IEmptyRequestData): IPrestige;
    /**
     * Handle /client/prestige/obtain
     */
    obtainPrestige(sessionID: string, request: IObtainPrestigeRequest): void;
}
