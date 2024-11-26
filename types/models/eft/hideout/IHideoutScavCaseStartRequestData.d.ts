export interface IHideoutScavCaseStartRequestData {
    Action: "HideoutScavCaseProductionStart";
    recipeId: string;
    items: IHideoutItem[];
    tools: ITool[];
    timestamp: number;
}
export interface IHideoutItem {
    id: string;
    count: number;
}
export interface ITool {
    id: string;
    count: number;
}
