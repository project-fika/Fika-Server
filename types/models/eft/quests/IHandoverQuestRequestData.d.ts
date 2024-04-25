export interface IHandoverQuestRequestData {
    Action: "QuestHandover";
    qid: string;
    conditionId: string;
    items: Item[];
}
export interface Item {
    id: string;
    count: number;
}
