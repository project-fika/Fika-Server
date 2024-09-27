export interface IHandoverQuestRequestData {
    Action: "QuestHandover";
    qid: string;
    conditionId: string;
    items: IHandoverItem[];
}
export interface IHandoverItem {
    id: string;
    count: number;
}
