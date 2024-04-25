export interface IFailQuestRequestData {
    Action: "QuestFail";
    qid: string;
    removeExcessItems: boolean;
}
