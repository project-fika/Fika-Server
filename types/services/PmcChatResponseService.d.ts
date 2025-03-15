import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IAggressor, IVictim } from "@spt/models/eft/common/tables/IBotBase";
import { IUserDialogInfo } from "@spt/models/eft/profile/IUserDialogInfo";
import { IGiftsConfig } from "@spt/models/spt/config/IGiftsConfig";
import { IPmcChatResponse } from "@spt/models/spt/config/IPmChatResponse";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { GiftService } from "@spt/services/GiftService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MatchBotDetailsCacheService } from "@spt/services/MatchBotDetailsCacheService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class PmcChatResponseService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected notificationSendHelper: NotificationSendHelper;
    protected matchBotDetailsCacheService: MatchBotDetailsCacheService;
    protected localisationService: LocalisationService;
    protected localeService: LocaleService;
    protected giftService: GiftService;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected configServer: ConfigServer;
    protected pmcResponsesConfig: IPmcChatResponse;
    protected giftConfig: IGiftsConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, notificationSendHelper: NotificationSendHelper, matchBotDetailsCacheService: MatchBotDetailsCacheService, localisationService: LocalisationService, localeService: LocaleService, giftService: GiftService, weightedRandomHelper: WeightedRandomHelper, configServer: ConfigServer);
    /**
     * For each PMC victim of the player, have a chance to send a message to the player, can be positive or negative
     * @param sessionId Session id
     * @param pmcVictims Array of bots killed by player
     * @param pmcData Player profile
     */
    sendVictimResponse(sessionId: string, pmcVictims: IVictim[], pmcData: IPmcData): void;
    /**
     * Not fully implemented yet, needs method of acquiring killers details after raid
     * @param sessionId Session id
     * @param pmcData Players profile
     * @param killer The bot who killed the player
     */
    sendKillerResponse(sessionId: string, pmcData: IPmcData, killer: IAggressor): void;
    /**
     * Choose a localised message to send the player (different if sender was killed or killed player)
     * @param isVictim Is the message coming from a bot killed by the player
     * @param pmcData Player profile
     * @param victimData OPTIMAL - details of the pmc killed
     * @returns Message from PMC to player
     */
    protected chooseMessage(isVictim: boolean, pmcData: IPmcData, victimData?: IVictim): string | undefined;
    /**
     * use map key to get a localised location name
     * e.g. factory4_day becomes "Factory"
     * @param locationKey location key to localise
     * @returns Localised location name
     */
    protected getLocationName(locationKey: string): string;
    /**
     * Should capitalisation be stripped from the message response before sending
     * @param isVictim Was responder a victim of player
     * @returns true = should be stripped
     */
    protected stripCapitalistion(isVictim: boolean): boolean;
    /**
     * Should capitalisation be stripped from the message response before sending
     * @param isVictim Was responder a victim of player
     * @returns true = should be stripped
     */
    protected allCaps(isVictim: boolean): boolean;
    /**
     * Should a suffix be appended to the end of the message being sent to player
     * @param isVictim Was responder a victim of player
     * @returns true = should be stripped
     */
    protected appendSuffixToMessageEnd(isVictim: boolean): boolean;
    /**
     * Choose a type of response based on the weightings in pmc response config
     * @param isVictim Was responder killed by player
     * @returns Response type (positive/negative)
     */
    protected chooseResponseType(isVictim?: boolean): string;
    /**
     * Get locale keys related to the type of response to send (victim/killer)
     * @param keyType Positive/negative
     * @param isVictim Was responder killed by player
     * @returns
     */
    protected getResponseLocaleKeys(keyType: string, isVictim?: boolean): string[];
    /**
     * Get all locale keys that start with `pmcresponse-suffix`
     * @returns array of keys
     */
    protected getResponseSuffixLocaleKeys(): string[];
    /**
     * Randomly draw a victim of the the array and return thier details
     * @param pmcVictims Possible victims to choose from
     * @returns IUserDialogInfo
     */
    protected chooseRandomVictim(pmcVictims: IVictim[]): IUserDialogInfo;
    /**
     * Convert a victim object into a IUserDialogInfo object
     * @param pmcVictim victim to convert
     * @returns IUserDialogInfo
     */
    protected getVictimDetails(pmcVictim: IVictim): IUserDialogInfo;
}
