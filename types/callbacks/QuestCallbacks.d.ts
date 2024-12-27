import { QuestController } from "@spt/controllers/QuestController";
import { RepeatableQuestController } from "@spt/controllers/RepeatableQuestController";
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
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class QuestCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected questController: QuestController;
    protected repeatableQuestController: RepeatableQuestController;
    constructor(httpResponse: HttpResponseUtil, questController: QuestController, repeatableQuestController: RepeatableQuestController);
    /**
     * Handle RepeatableQuestChange event
     */
    changeRepeatableQuest(pmcData: IPmcData, body: IRepeatableQuestChangeRequest, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle QuestAccept event
     */
    acceptQuest(pmcData: IPmcData, body: IAcceptQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle QuestComplete event
     */
    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle QuestHandover event
     */
    handoverQuest(pmcData: IPmcData, body: IHandoverQuestRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle client/quest/list
     */
    listQuests(url: string, info: IListQuestsRequestData, sessionID: string): IGetBodyResponseData<IQuest[]>;
    /**
     * Handle client/repeatalbeQuests/activityPeriods
     */
    activityPeriods(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcDataRepeatableQuest[]>;
}
