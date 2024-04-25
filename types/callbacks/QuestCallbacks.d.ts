import { QuestController } from "@spt-aki/controllers/QuestController";
import { RepeatableQuestController } from "@spt-aki/controllers/RepeatableQuestController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "@spt-aki/models/eft/common/tables/IRepeatableQuests";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "@spt-aki/models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "@spt-aki/models/eft/quests/ICompleteQuestRequestData";
import { IHandoverQuestRequestData } from "@spt-aki/models/eft/quests/IHandoverQuestRequestData";
import { IListQuestsRequestData } from "@spt-aki/models/eft/quests/IListQuestsRequestData";
import { IRepeatableQuestChangeRequest } from "@spt-aki/models/eft/quests/IRepeatableQuestChangeRequest";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
