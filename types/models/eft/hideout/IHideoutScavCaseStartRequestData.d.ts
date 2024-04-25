export interface IHideoutScavCaseStartRequestData {
    Action: "HideoutScavCaseProductionStart";
    recipeId: string;
    items: HideoutItem[];
    tools: Tool[];
    timestamp: number;
}
export interface HideoutItem {
    id: string;
    count: number;
}
export interface Tool {
    id: string;
    count: number;
}
