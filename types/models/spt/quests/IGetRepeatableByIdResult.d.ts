import { IPmcDataRepeatableQuest, IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
export interface IGetRepeatableByIdResult {
    quest: IRepeatableQuest;
    repeatableType: IPmcDataRepeatableQuest;
}
