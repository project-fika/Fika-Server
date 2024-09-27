import { ApplicationContext } from "@spt/context/ApplicationContext";
import { BotController } from "@spt/controllers/BotController";
import { IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IDifficulties } from "@spt/models/eft/common/tables/IBotType";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class BotCallbacks {
    protected botController: BotController;
    protected httpResponse: HttpResponseUtil;
    protected applicationContext: ApplicationContext;
    constructor(botController: BotController, httpResponse: HttpResponseUtil, applicationContext: ApplicationContext);
    /**
     * Handle singleplayer/settings/bot/limit
     * Is called by client to define each bot roles wave limit
     * @returns string
     */
    getBotLimit(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle singleplayer/settings/bot/difficulty
     * @returns string
     */
    getBotDifficulty(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle singleplayer/settings/bot/difficulties
     * @returns dictionary of every bot and its diffiulty settings
     */
    getAllBotDifficulties(url: string, info: IEmptyRequestData, sessionID: string): Record<string, IDifficulties>;
    /**
     * Handle client/game/bot/generate
     * @returns IGetBodyResponseData
     */
    generateBots(url: string, info: IGenerateBotsRequestData, sessionID: string): Promise<IGetBodyResponseData<IBotBase[]>>;
    /**
     * Handle singleplayer/settings/bot/maxCap
     * @returns string
     */
    getBotCap(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle singleplayer/settings/bot/getBotBehaviours
     * @returns string
     */
    getBotBehaviours(): string;
}
