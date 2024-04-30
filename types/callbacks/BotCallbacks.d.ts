import { BotController } from "@spt-aki/controllers/BotController";
import { IGenerateBotsRequestData } from "@spt-aki/models/eft/bot/IGenerateBotsRequestData";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { Difficulties } from "@spt-aki/models/eft/common/tables/IBotType";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class BotCallbacks {
    protected botController: BotController;
    protected httpResponse: HttpResponseUtil;
    constructor(botController: BotController, httpResponse: HttpResponseUtil);
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
    getAllBotDifficulties(url: string, info: IEmptyRequestData, sessionID: string): Record<string, Difficulties>;
    /**
     * Handle client/game/bot/generate
     * @returns IGetBodyResponseData
     */
    generateBots(url: string, info: IGenerateBotsRequestData, sessionID: string): IGetBodyResponseData<IBotBase[]>;
    /**
     * Handle singleplayer/settings/bot/maxCap
     * @returns string
     */
    getBotCap(): string;
    /**
     * Handle singleplayer/settings/bot/getBotBehaviours
     * @returns string
     */
    getBotBehaviours(): string;
}
