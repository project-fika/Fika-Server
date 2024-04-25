import { IDialogueChatBot } from "@spt-aki/helpers/Dialogue/IDialogueChatBot";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { IWeatherConfig } from "@spt-aki/models/spt/config/IWeatherConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { GiftService } from "@spt-aki/services/GiftService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
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
