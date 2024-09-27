import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { GiftSentResult } from "@spt/models/enums/GiftSentResult";
import { MessageType } from "@spt/models/enums/MessageType";
import { IGift, IGiftsConfig } from "@spt/models/spt/config/IGiftsConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class GiftService {
    protected logger: ILogger;
    protected mailSendService: MailSendService;
    protected localisationService: LocalisationService;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected giftConfig: IGiftsConfig;
    constructor(logger: ILogger, mailSendService: MailSendService, localisationService: LocalisationService, hashUtil: HashUtil, timeUtil: TimeUtil, profileHelper: ProfileHelper, configServer: ConfigServer);
    /**
     * Does a gift with a specific ID exist in db
     * @param giftId Gift id to check for
     * @returns True if it exists in  db
     */
    giftExists(giftId: string): boolean;
    getGiftById(giftId: string): IGift;
    /**
     * Get dictionary of all gifts
     * @returns Dict keyed by gift id
     */
    getGifts(): Record<string, IGift>;
    /**
     * Get an array of all gift ids
     * @returns string array of gift ids
     */
    getGiftIds(): string[];
    /**
     * Send player a gift from a range of sources
     * @param playerId Player to send gift to / sessionId
     * @param giftId Id of gift in configs/gifts.json to send player
     * @returns outcome of sending gift to player
     */
    sendGiftToPlayer(playerId: string, giftId: string): GiftSentResult;
    /**
     * Get sender id based on gifts sender type enum
     * @param giftData Gift to send player
     * @returns trader/user/system id
     */
    protected getSenderId(giftData: IGift): string | undefined;
    /**
     * Convert GiftSenderType into a dialog MessageType
     * @param giftData Gift to send player
     * @returns MessageType enum value
     */
    protected getMessageType(giftData: IGift): MessageType | undefined;
    /**
     * Prapor sends gifts to player for first week after profile creation
     * @param sessionId Player id
     * @param day What day to give gift for
     */
    sendPraporStartingGift(sessionId: string, day: number): void;
}
