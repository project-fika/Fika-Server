import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IQuest } from "@spt/models/eft/common/tables/IQuest";
import type { IPmcDataRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IAcceptQuestRequestData } from "@spt/models/eft/quests/IAcceptQuestRequestData";
import type { ICompleteQuestRequestData } from "@spt/models/eft/quests/ICompleteQuestRequestData";
import type { IHandoverQuestRequestData } from "@spt/models/eft/quests/IHandoverQuestRequestData";
import type { IListQuestsRequestData } from "@spt/models/eft/quests/IListQuestsRequestData";
import type { IRepeatableQuestChangeRequest } from "@spt/models/eft/quests/IRepeatableQuestChangeRequest";
export interface IQuestCallbacks {
    changeRepeatableQuest(pmcData: IPmcData, body: IRepeatableQuestChangeRequest, sessionID: string): IItemEventRouterResponse;
    acceptQuest(pmcData: IPmcData, body: IAcceptQuestRequestData, sessionID: string): IItemEventRouterResponse;
    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string): IItemEventRouterResponse;
    handoverQuest(pmcData: IPmcData, body: IHandoverQuestRequestData, sessionID: string): IItemEventRouterResponse;
    listQuests(url: string, info: IListQuestsRequestData, sessionID: string): IGetBodyResponseData<IQuest[]>;
    activityPeriods(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcDataRepeatableQuest[]>;
}
