import { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { GiftService } from "@spt/services/GiftService";
import { MailSendService } from "@spt/services/MailSendService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class SptDialogueChatBot implements IDialogueChatBot {
    protected profileHelper: ProfileHelper;
    protected randomUtil: RandomUtil;
    protected mailSendService: MailSendService;
    protected giftService: GiftService;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    protected weatherConfig: IWeatherConfig;
    constructor(profileHelper: ProfileHelper, randomUtil: RandomUtil, mailSendService: MailSendService, giftService: GiftService, configServer: ConfigServer);
    getChatBot(): IUserDialogInfo;
    /**
     * Send responses back to player when they communicate with SPT friend on friends list
     * @param sessionId Session Id
     * @param request send message request
     */
    handleMessage(sessionId: string, request: ISendMessageRequest): string;
}
