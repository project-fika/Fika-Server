import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { GiftSentResult } from "@spt-aki/models/enums/GiftSentResult";
import { MessageType } from "@spt-aki/models/enums/MessageType";
import { Gift, IGiftsConfig } from "@spt-aki/models/spt/config/IGiftsConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class GiftService {
    protected logger: ILogger;
    protected mailSendService: MailSendService;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected giftConfig: IGiftsConfig;
    constructor(logger: ILogger, mailSendService: MailSendService, hashUtil: HashUtil, timeUtil: TimeUtil, profileHelper: ProfileHelper, configServer: ConfigServer);
    /**
     * Does a gift with a specific ID exist in db
     * @param giftId Gift id to check for
     * @returns True if it exists in  db
     */
    giftExists(giftId: string): boolean;
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
    protected getSenderId(giftData: Gift): string;
    /**
     * Convert GiftSenderType into a dialog MessageType
     * @param giftData Gift to send player
     * @returns MessageType enum value
     */
    protected getMessageType(giftData: Gift): MessageType;
    /**
     * Prapor sends gifts to player for first week after profile creation
     * @param sessionId Player id
     * @param day What day to give gift for
     */
    sendPraporStartingGift(sessionId: string, day: number): void;
}
