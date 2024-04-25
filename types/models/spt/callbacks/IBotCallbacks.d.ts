import { IGenerateBotsRequestData } from "@spt-aki/models/eft/bot/IGenerateBotsRequestData";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
export interface IBotCallbacks {
    getBotLimit(url: string, info: IEmptyRequestData, sessionID: string): string;
    getBotDifficulty(url: string, info: IEmptyRequestData, sessionID: string): string;
    generateBots(url: string, info: IGenerateBotsRequestData, sessionID: string): IGetBodyResponseData<IBotBase[]>;
    getBotCap(): string;
}
