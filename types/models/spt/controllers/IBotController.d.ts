import type { IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import type { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import type { IBotCore } from "@spt/models/eft/common/tables/IBotCore";
import type { IDifficultyCategories } from "@spt/models/eft/common/tables/IBotType";
export interface IBotController {
    getBotLimit(type: string): number;
    getBotDifficulty(type: string, difficulty: string): IBotCore | IDifficultyCategories;
    isBotPmc(botRole: string): boolean;
    isBotBoss(botRole: string): boolean;
    isBotFollower(botRole: string): boolean;
    generate(info: IGenerateBotsRequestData, playerScav: boolean): IBotBase[];
    getBotCap(): number;
}
