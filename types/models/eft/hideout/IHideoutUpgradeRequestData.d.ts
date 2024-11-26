export interface IHideoutUpgradeRequestData {
    Action: "HideoutUpgrade";
    areaType: number;
    items: IHideoutItem[];
    timestamp: number;
}
export interface IHideoutItem {
    count: number;
    id: string;
}
