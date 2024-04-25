import { IGenerateBotsRequestData } from "@spt-aki/models/eft/bot/IGenerateBotsRequestData";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { IBotCore } from "@spt-aki/models/eft/common/tables/IBotCore";
import { Difficulty } from "@spt-aki/models/eft/common/tables/IBotType";
export interface IBotController {
    getBotLimit(type: string): number;
    getBotDifficulty(type: string, difficulty: string): IBotCore | Difficulty;
    isBotPmc(botRole: string): boolean;
    isBotBoss(botRole: string): boolean;
    isBotFollower(botRole: string): boolean;
    generate(info: IGenerateBotsRequestData, playerScav: boolean): IBotBase[];
    getBotCap(): number;
}
