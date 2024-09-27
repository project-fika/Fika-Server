export interface IHideoutSingleProductionStartRequestData {
    Action: "HideoutSingleProductionStart";
    recipeId: string;
    items: IHandoverItem[];
    tools: IHandoverItem[];
    timestamp: number;
}
export interface IHandoverItem {
    id: string;
    count: number;
}
